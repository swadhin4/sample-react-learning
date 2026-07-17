import { useState } from 'react';
import { getClaimData, DEFAULT_CHANNEL } from '../constants';

export function useApp() {
  const [claimNumber, setClaimNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [employee, setEmployee] = useState({});
  const [customer, setCustomer] = useState({});
  
  const [claimInfo, setClaimInfo] = useState({});
  const [benefitInfo, setBenefitInfo] = useState({});
  
  const [activeTab, setActiveTab] = useState("correspondence"); // "correspondence" | "recipients" | "wip"

  // Letter / Favorites State
  const [category, setCategory] = useState("");
  const [letter, setLetter] = useState("");
  const [favorites, setFavorites] = useState([
    { category: "Sample Learning 11", letter: "Sample Learning 13" },
    { category: "Sample Learning 12", letter: "Sample Learning 16" }
  ]);

  // Sender State
  const [senderInfo, setSenderInfo] = useState({
    senderType: "Self",
    onBehalfName: "",
    firstName: "Sample Learning 98",
    lastName: "Sample Learning 99",
    title: "Sample Learning 100",
    returnAddress: "Sample Learning 101\nSample Learning 102\nSample Learning 103",
    enclosure: "None",
    includePostage: false
  });

  // Recipients State (Grid based)
  const [recipientsList, setRecipientsList] = useState([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  // Attachments State (Grid based)
  const [attachmentsList, setAttachmentsList] = useState([]);
  const [selectedAttachmentId, setSelectedAttachmentId] = useState(null);

  // Notes/Memo State
  const [notes, setNotes] = useState("");

  // WIP State
  const [wipList, setWipList] = useState([
    { 
      id: 1, 
      claimNumber: "CLM-7719", 
      employee: "Sample Learning 22 Sample Learning 23", 
      letter: "Sample Learning 13", 
      recipient: "Sample Learning 22 Sample Learning 23", 
      channel: "Sample Learning 19", 
      status: "Sample Learning 104", 
      date: "2026-07-17",
      category: "Sample Learning 11",
      recipientsList: [
        { id: 1, isPrimary: true, isCC: false, method: "Sample Learning 19", prefix: "Mr.", firstName: "Sample Learning 22", mi: "A", lastName: "Sample Learning 23", suffix: "", title: "Sample Learning 105", organization: "Sample Learning 26" }
      ],
      attachmentsList: [
        { id: 1, title: "Sample Learning 106", copies: 1, source: "Sample Learning 107", category: "Sample Learning 108", author: "Sample Learning 109", created: "Sample Learning 110" }
      ],
      notes: ""
    }
  ]);

  const isSelectionComplete = category !== "" && letter !== "";

  const handleSearch = (queryStr) => {
    const q = queryStr || searchQuery;
    if (!q.trim()) {
      setSearchError("Please enter a valid claim number.");
      return;
    }
    setSearchError("");
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const data = getClaimData(q);
      setEmployee(data.employee);
      setCustomer(data.customer);
      setClaimInfo(data.claimInfo);
      setBenefitInfo(data.benefitInfo);
      setClaimNumber(q.toUpperCase().trim());

      // Initialize Recipients List Grid with Employee/Customer Context
      const defaultRecipient = {
        id: 1,
        isPrimary: true,
        isCC: false,
        method: "Sample Learning 19",
        prefix: "Mr.",
        firstName: data.employee.firstName || "",
        mi: data.employee.mi || "",
        lastName: data.employee.lastName || "",
        suffix: "",
        title: "Sample Learning 105",
        organization: data.customer.name || ""
      };
      setRecipientsList([defaultRecipient]);
      setSelectedRecipientId(defaultRecipient.id);

      // Initialize Attachments List Grid with default library items
      const defaultAttachments = [
        { id: 1, title: "Sample Learning 106", copies: 1, source: "Sample Learning 107", category: "Sample Learning 108", author: "Sample Learning 109", created: "Sample Learning 110" },
        { id: 2, title: "Sample Learning 116", copies: 1, source: "Sample Learning 117", category: "Sample Learning 108", author: "Sample Learning 118", created: "Sample Learning 119" }
      ];
      setAttachmentsList(defaultAttachments);
      setSelectedAttachmentId(defaultAttachments[0].id);

      setLoading(false);
    }, 850);
  };

  const handleReset = () => {
    setClaimNumber("");
    setSearchQuery("");
    setEmployee({});
    setCustomer({});
    setClaimInfo({});
    setBenefitInfo({});
    setCategory("");
    setLetter("");
    setRecipientsList([]);
    setSelectedRecipientId(null);
    setAttachmentsList([]);
    setSelectedAttachmentId(null);
    setNotes("");
    setActiveTab("correspondence");
  };

  // Favorites Helpers
  const addToFavorites = () => {
    if (!category || !letter) return;
    const exists = favorites.some(fav => fav.category === category && fav.letter === letter);
    if (!exists) {
      setFavorites(prev => [...prev, { category, letter }]);
    }
  };

  const removeFromFavorites = (favCategory, favLetter) => {
    setFavorites(prev => prev.filter(fav => !(fav.category === favCategory && fav.letter === favLetter)));
  };

  // Recipients Helpers
  const addRecipientRow = () => {
    const newRow = {
      id: Date.now(),
      isPrimary: recipientsList.length === 0, // Mark first as primary if empty
      isCC: recipientsList.length > 0,
      method: "Sample Learning 19",
      prefix: "",
      firstName: "",
      mi: "",
      lastName: "",
      suffix: "",
      title: "",
      organization: ""
    };
    setRecipientsList(prev => [...prev, newRow]);
    setSelectedRecipientId(newRow.id);
  };

  const updateRecipientRow = (id, field, value) => {
    setRecipientsList(prev => prev.map(row => {
      if (row.id === id) {
        if (field === 'isPrimary' && value === true) {
          // Turn off CC if selected as Primary
          return { ...row, isPrimary: true, isCC: false };
        }
        return { ...row, [field]: value };
      } else {
        if (field === 'isPrimary' && value === true) {
          // Enforce single primary recipient rule
          return { ...row, isPrimary: false };
        }
        return row;
      }
    }));
  };

  const deleteRecipientRow = () => {
    if (!selectedRecipientId) {
      alert("Please select a recipient row to delete.");
      return;
    }
    setRecipientsList(prev => {
      const remaining = prev.filter(row => row.id !== selectedRecipientId);
      // Auto select another if possible
      if (remaining.length > 0) {
        setSelectedRecipientId(remaining[0].id);
        // Ensure at least one primary remains if deleted one was primary
        const hasPrimary = remaining.some(r => r.isPrimary);
        if (!hasPrimary) {
          remaining[0].isPrimary = true;
        }
      } else {
        setSelectedRecipientId(null);
      }
      return remaining;
    });
  };

  // Attachments Helpers
  const addAttachmentFile = (name) => {
    const newAttachment = {
      id: Date.now(),
      title: name,
      copies: 1,
      source: "Sample Learning 117",
      category: "Sample Learning 120",
      author: `${senderInfo.firstName} ${senderInfo.lastName}`,
      created: new Date().toLocaleString()
    };
    setAttachmentsList(prev => [...prev, newAttachment]);
    setSelectedAttachmentId(newAttachment.id);
  };

  const updateAttachmentRow = (id, field, value) => {
    setAttachmentsList(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const deleteAttachmentRow = () => {
    if (!selectedAttachmentId) {
      alert("Please select an attachment row to delete.");
      return;
    }
    setAttachmentsList(prev => {
      const remaining = prev.filter(item => item.id !== selectedAttachmentId);
      if (remaining.length > 0) {
        setSelectedAttachmentId(remaining[0].id);
      } else {
        setSelectedAttachmentId(null);
      }
      return remaining;
    });
  };

  // WIP Helpers
  const addCorrespondenceToWip = () => {
    if (!category || !letter) {
      alert("Please select a Category and Letter before saving to WIP.");
      return;
    }
    
    const primaryRecip = recipientsList.find(r => r.isPrimary) || recipientsList[0] || {};
    const primaryName = `${primaryRecip.firstName || ""} ${primaryRecip.lastName || ""}`.trim() || "None";
    
    const newWipItem = {
      id: Date.now(),
      claimNumber: claimNumber,
      employee: `${employee.firstName || ""} ${employee.lastName || ""}`.trim() || "N/A",
      letter: letter,
      category: category,
      recipient: primaryName,
      channel: primaryRecip.method || "Sample Learning 19",
      status: "Sample Learning 121",
      date: new Date().toISOString().split('T')[0],
      // Extended grid states
      recipientsList: recipientsList,
      attachmentsList: attachmentsList,
      notes: notes
    };
    setWipList(prev => [...prev, newWipItem]);
    alert("Draft saved to WIP list successfully!");
    setActiveTab("wip");
  };

  const loadWipItem = (item) => {
    setCategory(item.category || "");
    setLetter(item.letter || "");
    setRecipientsList(item.recipientsList || []);
    if ((item.recipientsList || []).length > 0) {
      setSelectedRecipientId(item.recipientsList[0].id);
    } else {
      setSelectedRecipientId(null);
    }
    setAttachmentsList(item.attachmentsList || []);
    if ((item.attachmentsList || []).length > 0) {
      setSelectedAttachmentId(item.attachmentsList[0].id);
    } else {
      setSelectedAttachmentId(null);
    }
    setNotes(item.notes || "");
    setActiveTab("correspondence");
    alert("Draft loaded into active session!");
  };

  const deleteWipItem = (id) => {
    setWipList(prev => prev.filter(item => item.id !== id));
  };

  return {
    claimNumber,
    searchQuery,
    setSearchQuery,
    loading,
    searchError,
    employee,
    setEmployee,
    customer,
    setCustomer,
    claimInfo,
    setClaimInfo,
    benefitInfo,
    setBenefitInfo,
    activeTab,
    setActiveTab,
    category,
    setCategory,
    letter,
    setLetter,
    favorites,
    addToFavorites,
    removeFromFavorites,
    senderInfo,
    setSenderInfo,
    recipientsList,
    selectedRecipientId,
    setSelectedRecipientId,
    addRecipientRow,
    updateRecipientRow,
    deleteRecipientRow,
    attachmentsList,
    selectedAttachmentId,
    setSelectedAttachmentId,
    addAttachmentFile,
    updateAttachmentRow,
    deleteAttachmentRow,
    notes,
    setNotes,
    wipList,
    addCorrespondenceToWip,
    loadWipItem,
    deleteWipItem,
    isSelectionComplete,
    handleSearch,
    handleReset
  };
}
