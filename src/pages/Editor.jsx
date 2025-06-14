import React, { useState, useCallback, useRef } from 'react';
import { useCardContext } from '../context/useCardContext';
import CardPreview from '../components/card/CardPreview';
import CardEditor from '../components/card/CardEditor';
import TemplateSelector from '../components/card/TemplateSelector';
import { 
  FaPalette, 
  FaSave, 
  FaDownload, 
  FaUndo, 
  FaShareAlt, 
  FaTimes,
  FaPrint
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const EditorPage = () => {
  const { cardData, updateCardData, resetCard, applyTemplate } = useCardContext();
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const previewRef = useRef(null);

  const handleApplyTemplate = useCallback((templateId) => {
    applyTemplate(templateId);
    setShowTemplates(false);
  }, [applyTemplate]);

  const handleSaveDraft = useCallback(() => {
    setIsSaving(true);
    try {
      setTimeout(() => {
        setIsSaving(false);
        alert('Draft saved successfully!');
      }, 500);
    } catch (error) {
      setIsSaving(false);
      alert('Failed to save draft: ' + error.message);
    }
  }, []);

  const captureCardImage = useCallback(async () => {
    if (!previewRef.current) return null;
    
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      backgroundColor: null,
      logging: false,
      useCORS: true
    });
    
    return canvas;
  }, []);

  const handleDownloadCard = useCallback(async (isPreview = false) => {
    setIsDownloading(true);
    try {
      const canvas = await captureCardImage();
      if (!canvas) return;
      
      canvas.toBlob(blob => {
        if (blob) {
          saveAs(blob, `fathers-day-card-${isPreview ? 'preview' : 'final'}.png`);
          setIsDownloading(false);
        }
      });
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      alert('Download failed. Please try again.');
    }
  }, [captureCardImage]);

  const handleShareCard = useCallback(async () => {
    setIsSharing(true);
    try {
      const canvas = await captureCardImage();
      if (!canvas) return;
      
      canvas.toBlob(async blob => {
        if (blob) {
          setTimeout(() => {
            setIsSharing(false);
            navigator.clipboard.writeText(window.location.href);
            alert('Share link copied to clipboard!');
          }, 500);
        }
      });
    } catch (error) {
      console.error('Sharing failed:', error);
      setIsSharing(false);
      alert('Sharing failed. Please try again.');
    }
  }, [captureCardImage]);

  const handlePrintCard = useCallback(async () => {
    setIsPrinting(true);
    try {
      const canvas = await captureCardImage();
      if (!canvas) return;
      
      const dataUrl = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head><title>Print Card</title></head>
          <body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
            <img src="${dataUrl}" style="max-width:100%;max-height:100%;" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
    } catch (error) {
      console.error('Printing failed:', error);
      alert('Printing failed. Please try again.');
    } finally {
      setIsPrinting(false);
    }
  }, [captureCardImage]);

  const handleResetCard = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the card? All changes will be lost.')) {
      resetCard();
    }
  }, [resetCard]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Top Bar - Simplified */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              Create Your Father's Day Card
            </h1>
            <p className="text-gray-600">Design a personalized card for your dad</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="flex items-center gap-1 bg-white border border-gray-200 py-2 px-3 rounded-lg font-medium hover:border-orange-300 transition-colors text-sm"
            >
              <FaSave className="text-gray-600" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={() => handleDownloadCard(false)}
              disabled={isDownloading}
              className="flex items-center gap-1 bg-orange-500 text-white py-2 px-3 rounded-lg font-medium text-sm hover:bg-orange-600"
            >
              <FaDownload />
              {isDownloading ? 'Processing...' : 'Download'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Selection Panel */}
          {showTemplates && (
            <TemplateSelector 
              onSelectTemplate={handleApplyTemplate}
              onClose={() => setShowTemplates(false)}
            />
          )}
          
          {/* Main Content */}
          <div className={`${showTemplates ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Card Preview */}
              <div className="xl:col-span-2 bg-white rounded-xl shadow p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Card Preview</h2>
                  <button 
                    className="flex items-center gap-1 bg-orange-100 text-orange-700 py-1.5 px-3 rounded-lg font-medium hover:bg-orange-200"
                    onClick={() => setShowTemplates(!showTemplates)}
                  >
                    <FaPalette />
                    {showTemplates ? 'Hide Templates' : 'Change Template'}
                  </button>
                </div>
                
                <div className="flex justify-center" ref={previewRef}>
                  <CardPreview />
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={handleResetCard}
                    className="flex items-center gap-1 bg-white border border-gray-200 py-1.5 px-3 rounded-lg font-medium hover:border-orange-300 text-sm"
                  >
                    <FaUndo />
                    Reset Card
                  </button>
                  <button 
                    onClick={() => handleDownloadCard(true)}
                    disabled={isDownloading}
                    className="flex items-center gap-1 bg-orange-500 text-white py-1.5 px-3 rounded-lg font-medium text-sm hover:bg-orange-600"
                  >
                    <FaDownload />
                    Download Preview
                  </button>
                </div>
              </div>
              
              {/* Card Editor */}
              <div className="xl:col-span-1 bg-white rounded-xl shadow p-4">
                <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
                  <button 
                    className={`py-2 px-3 font-medium min-w-max ${
                      activeTab === 'content' 
                        ? 'text-orange-600 border-b-2 border-orange-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('content')}
                  >
                    Content
                  </button>
                  <button 
                    className={`py-2 px-3 font-medium min-w-max ${
                      activeTab === 'design' 
                        ? 'text-orange-600 border-b-2 border-orange-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('design')}
                  >
                    Design
                  </button>
                  <button 
                    className={`py-2 px-3 font-medium min-w-max ${
                      activeTab === 'image' 
                        ? 'text-orange-600 border-b-2 border-orange-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('image')}
                  >
                    Image
                  </button>
                </div>
                
                <CardEditor activeTab={activeTab} />
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-bold text-gray-700 mb-2">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={handleSaveDraft}
                      disabled={isSaving}
                      className="bg-gray-100 py-1.5 rounded-lg font-medium text-gray-700 text-sm hover:bg-gray-200"
                    >
                      Save Draft
                    </button>
                    <button 
                      onClick={() => handleDownloadCard(false)}
                      disabled={isDownloading}
                      className="bg-orange-500 text-white py-1.5 rounded-lg font-medium text-sm hover:bg-orange-600"
                    >
                      Download
                    </button>
                    <button 
                      onClick={handleShareCard}
                      disabled={isSharing}
                      className="bg-gray-100 py-1.5 rounded-lg font-medium text-gray-700 text-sm hover:bg-gray-200"
                    >
                      Share
                    </button>
                    <button 
                      onClick={handlePrintCard}
                      disabled={isPrinting}
                      className="bg-gray-800 text-white py-1.5 rounded-lg font-medium text-sm flex items-center justify-center hover:bg-gray-900"
                    >
                      <FaPrint className="mr-1" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;