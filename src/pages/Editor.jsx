import React, { useState, useCallback, useRef } from 'react';
import { useCardContext } from '../context/useCardContext';
import CardPreview from '../components/card/CardPreview';
import CardEditor from '../components/card/CardEditor';
import Modal from '../components/ui/Modal';
import ToastsContainer from '../components/ui/Toast';
import { FaPalette, FaSave, FaDownload, FaUndo, FaShareAlt, FaPenSquare, FaImage } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const Editor = () => {
  const { cardData, updateCardData, resetCard } = useCardContext();
  const [activeTab, setActiveTab] = useState('content');
  const [isProcessing, setIsProcessing] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false });
  const [toasts, setToasts] = useState([]);
  const previewRef = useRef(null);
  
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(current => [...current, { id, message, type }]);
  };

  const dismissToast = (id) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  };

  const captureCardAsBlob = useCallback(async () => {
    if (!previewRef.current) return null;
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      });
      return await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    } catch (error) {
      console.error("Error capturing card image:", error);
      addToast('Could not capture card image.', 'error');
      return null;
    }
  }, []);

  const handleAction = async (actionType, actionFn) => {
    setIsProcessing(actionType);
    try {
      await actionFn();
    } catch(error) {
       addToast(`Action failed: ${error.message}`, 'error');
    } finally {
      setIsProcessing(null);
    }
  }

  const handleDownloadCard = useCallback(async () => {
    const blob = await captureCardAsBlob();
    if (blob) {
      saveAs(blob, `fathers-day-card.png`);
      addToast('Download started!', 'success');
    }
  }, [captureCardAsBlob]);
  
  const handleShareCard = useCallback(async () => {
    if (!navigator.share) {
      addToast('Sharing is not supported on this browser.', 'error');
      return;
    }

    const blob = await captureCardAsBlob();
    if (blob) {
        const file = new File([blob], 'fathers-day-card.png', { type: blob.type });
        try {
            await navigator.share({
                title: "A Card for Dad",
                text: "Check out this Father's Day card I made!",
                files: [file],
            });
            addToast('Shared successfully!', 'success');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Share failed:', error);
                addToast('Sharing failed.', 'error');
            }
        }
    }
  }, [captureCardAsBlob]);

  const handleResetCard = useCallback(() => {
    setModalState({
      isOpen: true,
      title: 'Reset Card',
      children: 'Are you sure you want to reset the card? All your changes will be lost.',
      primaryAction: () => {
        resetCard();
        addToast('Card has been reset.', 'info');
        setModalState({ isOpen: false });
      },
      secondaryAction: () => setModalState({ isOpen: false }),
      primaryLabel: "Yes, Reset"
    })
  }, [resetCard]);

  const handleSaveDraft = useCallback(() => {
    addToast('Draft saved successfully!', 'success');
  }, []);

  const TABS = [
    { id: 'content', label: 'Content', icon: <FaPenSquare /> },
    { id: 'design', label: 'Design', icon: <FaPalette /> },
    { id: 'image', label: 'Image', icon: <FaImage /> },
  ]

  return (
    <>
      <ToastsContainer toasts={toasts} dismissToast={dismissToast} />
      <Modal {...modalState} />
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-warm-light to-warm-medium p-4 sm:p-8 flex items-center justify-center">
            <CardPreview ref={previewRef} />
        </div>
        
        <div className="w-full lg:w-1/2 xl:w-2/5 bg-white shadow-2xl lg:shadow-none flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-primary">Card Editor</h1>
                <p className="text-gray-500">Customize your perfect card here.</p>
            </div>
            
            <div className="border-b border-gray-200 px-4">
                <div className="flex -mb-px">
                {TABS.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-3 px-4 font-semibold border-b-2 transition-colors ${
                            activeTab === tab.id 
                            ? 'border-secondary text-secondary' 
                            : 'border-transparent text-gray-500 hover:text-secondary'
                        }`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
                </div>
            </div>

            <div className="flex-grow p-6 overflow-y-auto">
                <CardEditor activeTab={activeTab} />
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                    onClick={() => handleAction('reset', handleResetCard)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-primary hover:bg-gray-100 transition-colors"
                >
                    <FaUndo/> Reset
                </button>
                <button
                    onClick={() => handleAction('save', handleSaveDraft)}
                    disabled={isProcessing === 'save'}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-primary hover:bg-gray-100 transition-colors"
                >
                    <FaSave/> Save
                </button>
                <button
                    onClick={() => handleAction('share', handleShareCard)}
                    disabled={isProcessing === 'share'}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-primary hover:bg-gray-100 transition-colors"
                >
                    <FaShareAlt/> Share
                </button>
                <button
                    onClick={() => handleAction('download', handleDownloadCard)}
                    disabled={isProcessing === 'download'}
                    className="col-span-2 sm:col-span-3 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-400"
                >
                    <FaDownload /> {isProcessing === 'download' ? 'Downloading...' : 'Download Card'}
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Editor;