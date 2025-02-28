import React, { useState, useRef } from 'react';
import { Upload, Video, Wand2, Settings, Clock, Download, Loader2, Image, Sliders, Music, Type, Palette, Layers } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('create');
  const [advancedMode, setAdvancedMode] = useState(false);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Advanced settings
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [videoStyle, setVideoStyle] = useState('Realistic');
  const [videoDuration, setVideoDuration] = useState('15 seconds');
  const [frameRate, setFrameRate] = useState('24 fps');
  const [colorGrading, setColorGrading] = useState('Standard');
  const [audioTrack, setAudioTrack] = useState('None');
  const [textOverlay, setTextOverlay] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');

  const handleGenerate = () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStage('Analyzing text prompt');
    
    // Simulate video generation with progress updates
    const totalTime = 6000; // 6 seconds total
    const stages = [
      'Analyzing text prompt',
      'Generating scene composition',
      'Rendering frames',
      'Adding effects',
      'Finalizing video'
    ];
    
    let currentStage = 0;
    const interval = setInterval(() => {
      const elapsed = (currentStage + 1) * (totalTime / stages.length);
      const progress = Math.min(Math.round((elapsed / totalTime) * 100), 100);
      
      setGenerationProgress(progress);
      setGenerationStage(stages[currentStage]);
      
      currentStage++;
      if (currentStage >= stages.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setGeneratedVideo('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
      }
    }, totalTime / stages.length);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const removeReferenceImage = () => {
    setReferenceImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Video className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold">TextToVideo</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={() => setActiveTab('create')}
                  className={`flex items-center space-x-1 ${activeTab === 'create' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <Wand2 className="h-4 w-4" />
                  <span>Create</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center space-x-1 ${activeTab === 'history' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <Clock className="h-4 w-4" />
                  <span>History</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center space-x-1 ${activeTab === 'settings' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'create' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Create Video from Text</h2>
                
                <div className="mb-6">
                  <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter your text prompt
                  </label>
                  <textarea
                    id="text-input"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    placeholder="Describe the video you want to generate in detail..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="advanced-mode"
                      checked={advancedMode}
                      onChange={() => setAdvancedMode(!advancedMode)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                    />
                    <label htmlFor="advanced-mode" className="ml-2 text-sm text-gray-300">
                      Advanced Mode
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={triggerImageUpload}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center space-x-1 text-sm"
                    >
                      <Image className="h-4 w-4" />
                      <span>Add Reference Image</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                {referenceImage && (
                  <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Reference Image</h3>
                      <button
                        onClick={removeReferenceImage}
                        className="text-gray-400 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="relative aspect-video max-h-48 overflow-hidden rounded-lg">
                      <img
                        src={referenceImage}
                        alt="Reference"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {advancedMode && (
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Palette className="h-4 w-4 mr-1" />
                        Video Style
                      </label>
                      <select 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                        value={videoStyle}
                        onChange={(e) => setVideoStyle(e.target.value)}
                      >
                        <option>Realistic</option>
                        <option>Animated</option>
                        <option>3D Rendered</option>
                        <option>Cinematic</option>
                        <option>Artistic</option>
                        <option>Noir</option>
                        <option>Vintage</option>
                        <option>Sci-Fi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Video Duration
                      </label>
                      <select 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                        value={videoDuration}
                        onChange={(e) => setVideoDuration(e.target.value)}
                      >
                        <option>15 seconds</option>
                        <option>30 seconds</option>
                        <option>1 minute</option>
                        <option>2 minutes</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Layers className="h-4 w-4 mr-1" />
                        Aspect Ratio
                      </label>
                      <select 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                      >
                        <option>16:9</option>
                        <option>4:3</option>
                        <option>1:1</option>
                        <option>9:16</option>
                        <option>21:9</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Sliders className="h-4 w-4 mr-1" />
                        Frame Rate
                      </label>
                      <select 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                        value={frameRate}
                        onChange={(e) => setFrameRate(e.target.value)}
                      >
                        <option>24 fps</option>
                        <option>30 fps</option>
                        <option>60 fps</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Palette className="h-4 w-4 mr-1" />
                        Color Grading
                      </label>
                      <select 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                        value={colorGrading}
                        onChange={(e) => setColorGrading(e.target.value)}
                      >
                        <option>Standard</option>
                        <option>Vibrant</option>
                        <option>Muted</option>
                        <option>High Contrast</option>
                        <option>Warm</option>
                        <option>Cool</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Music className="h-4 w-4 mr-1" />
                        Audio Track
                      </label>
                      <select 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                        value={audioTrack}
                        onChange={(e) => setAudioTrack(e.target.value)}
                      >
                        <option>None</option>
                        <option>Ambient</option>
                        <option>Cinematic</option>
                        <option>Upbeat</option>
                        <option>Dramatic</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="text-overlay"
                        checked={textOverlay}
                        onChange={() => setTextOverlay(!textOverlay)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                      />
                      <label htmlFor="text-overlay" className="ml-2 text-sm text-gray-300 flex items-center">
                        <Type className="h-4 w-4 mr-1" />
                        Add Text Overlay
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !text.trim()}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                      isGenerating || !text.trim()
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-5 w-5" />
                        <span>Generate Video</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {isGenerating && (
                <div className="border-t border-gray-700 p-6">
                  <h3 className="text-xl font-bold mb-4">Generation in Progress</h3>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{generationStage}</span>
                    <span>{generationProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                      style={{ width: `${generationProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">This may take a few minutes depending on complexity</p>
                </div>
              )}

              {generatedVideo && !isGenerating && (
                <div className="border-t border-gray-700 p-6">
                  <h3 className="text-xl font-bold mb-4">Generated Video</h3>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <video
                      src={generatedVideo}
                      controls
                      className="w-full h-full"
                    ></video>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-end">
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center space-x-2">
                      <Wand2 className="h-4 w-4" />
                      <span>Regenerate</span>
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Video</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 bg-gray-800 rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Tips for Better Results</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2 mt-1"></span>
                  <span>Be specific about scenes, characters, and actions</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2 mt-1"></span>
                  <span>Include details about lighting, camera angles, and mood</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2 mt-1"></span>
                  <span>Specify any text overlays or captions you want in the video</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2 mt-1"></span>
                  <span>Mention any specific visual style or reference you're aiming for</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2 mt-1"></span>
                  <span>Upload reference images for more accurate style matching</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Generation History</h2>
              <div className="space-y-4">
                <div className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">A serene mountain landscape with flowing rivers</h3>
                      <p className="text-sm text-gray-400 mt-1">Created on May 15, 2025</p>
                      <div className="flex space-x-2 mt-2">
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">16:9</span>
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">30s</span>
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">Cinematic</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-300">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Urban cityscape with futuristic elements</h3>
                      <p className="text-sm text-gray-400 mt-1">Created on May 12, 2025</p>
                      <div className="flex space-x-2 mt-2">
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">21:9</span>
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">1m</span>
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">Sci-Fi</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-300">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Animated character walking through a forest</h3>
                      <p className="text-sm text-gray-400 mt-1">Created on May 10, 2025</p>
                      <div className="flex space-x-2 mt-2">
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">1:1</span>
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">15s</span>
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">Animated</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-300">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Video Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Default Video Resolution
                      </label>
                      <select className="w-full md:w-1/3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                        <option>720p</option>
                        <option>1080p</option>
                        <option>1440p</option>
                        <option>4K</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Default Video Format
                      </label>
                      <select className="w-full md:w-1/3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                        <option>MP4</option>
                        <option>WebM</option>
                        <option>MOV</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Generation Quality
                      </label>
                      <select className="w-full md:w-1/3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                        <option>Standard</option>
                        <option>High</option>
                        <option>Ultra</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-lg font-medium mb-3">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Notifications
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-300">
                          Receive email when video generation is complete
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        API Usage
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="api-usage"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="api-usage" className="ml-2 text-sm text-gray-300">
                          Enable API access for third-party applications
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-lg font-medium mb-3">Storage</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span>Storage Used</span>
                      <span>1.2 GB / 5 GB</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                      Clear All Generated Videos
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-lg font-medium mb-3">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Model Version
                      </label>
                      <select className="w-full md:w-1/3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                        <option>Latest (v3.2)</option>
                        <option>Stable (v3.0)</option>
                        <option>Legacy (v2.5)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Processing Priority
                      </label>
                      <select className="w-full md:w-1/3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                        <option>Normal</option>
                        <option>High (Premium)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Video className="h-5 w-5 text-blue-400" />
              <span className="text-lg font-bold">TextToVideo</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 TextToVideo. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;