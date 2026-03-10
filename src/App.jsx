import React, { useState } from 'react';
import { Gamepad2, ArrowLeft, Maximize2, ExternalLink } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = gamesData.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Gamepad2 className="w-6 h-6 text-zinc-950" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">UNBLOCKED<span className="text-emerald-500">GAMES</span></h1>
          </div>

          {!selectedGame && (
            <div className="relative w-full max-w-xs hidden sm:block">
              <input
                type="text"
                placeholder="Search games..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedGame ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Library
              </button>
              <div className="flex items-center gap-4">
                <a 
                  href={selectedGame.iframeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold">{selectedGame.title}</h2>
              <p className="text-zinc-400 max-w-2xl">{selectedGame.description}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12 text-center sm:text-left">
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight">Game Library</h2>
              <p className="text-zinc-500">Choose a game and start playing instantly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <div 
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="group relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">{game.title}</h3>
                    <p className="text-sm text-zinc-500 line-clamp-2">{game.description}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-emerald-500 p-2 rounded-full shadow-lg">
                      <Maximize2 className="w-4 h-4 text-zinc-950" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-500 text-lg">No games found matching your search.</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-20 border-t border-zinc-900 py-12 text-center text-zinc-600 text-sm">
        <p>&copy; 2026 Unblocked Games Hub. All rights reserved.</p>
        <p className="mt-2">Play responsibly. Some games may require a keyboard.</p>
      </footer>
    </div>
  );
}
