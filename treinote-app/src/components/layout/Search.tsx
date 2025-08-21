import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchCategory = "page" | "event" | "community";

interface SearchItem {
  id: string;
  title: string;
  path: string;
  category: SearchCategory;
  subtitle?: string;
}

const DATA: SearchItem[] = [
  // Pages
  { id: "home", title: "Accueil", path: "/", category: "page" },
  {
    id: "training",
    title: "Entraînement",
    path: "/training",
    category: "page",
  },
  {
    id: "community",
    title: "Communauté",
    path: "/community",
    category: "page",
  },
  { id: "events", title: "Événements", path: "/events", category: "page" },
  { id: "about", title: "À propos", path: "/about", category: "page" },
  { id: "contact", title: "Contact", path: "/contact", category: "page" },
  {
    id: "my-training",
    title: "Mon tableau d'entraînement",
    path: "/my-training",
    category: "page",
  },
  // Événements (exemples)
  {
    id: "event-larmor",
    title: "Tournoi Larmor-Plage",
    subtitle: "Côte Bretagne",
    path: "/events#larmor-plage",
    category: "event",
  },
  {
    id: "event-sept-2025",
    title: "Stage du 1er septembre 2025",
    subtitle: "Pré-saison",
    path: "/events#sept-2025",
    category: "event",
  },
  // Communautés (exemples)
  {
    id: "community-general",
    title: "Communauté générale",
    subtitle: "Discussions et astuces",
    path: "/community#general",
    category: "community",
  },
  {
    id: "community-equipement",
    title: "Équipement et matériel",
    subtitle: "Raquettes, cordages, chaussures",
    path: "/community#gear",
    category: "community",
  },
];

const byCategoryOrder: Record<SearchCategory, number> = {
  page: 0,
  event: 1,
  community: 2,
};

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as SearchItem[];
    return DATA.filter((item) => item.title.toLowerCase().includes(q)).sort(
      (a, b) => byCategoryOrder[a.category] - byCategoryOrder[b.category]
    );
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleNavigate = (path: string) => {
    setOpen(false);
    setQuery("");
    navigate(path);
  };

  const grouped = useMemo(() => {
    const groups: Record<SearchCategory, SearchItem[]> = {
      page: [],
      event: [],
      community: [],
    };
    for (const item of results) groups[item.category].push(item);
    return groups;
  }, [results]);

  return (
    <div className="relative" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        placeholder="Rechercher"
        className="w-40 sm:w-56 md:w-64 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
      />
      <button
        type="button"
        onClick={() => {
          if (results.length > 0) handleNavigate(results[0].path);
          else setOpen(true);
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 z-50">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {results.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">
                Tapez pour rechercher pages, événements ou communautés…
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto py-2">
                {/* Pages */}
                {grouped.page.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Pages
                    </div>
                    {grouped.page.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.path)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs flex-none">
                          P
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm text-gray-800 truncate">
                            {item.title}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Events */}
                {grouped.event.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Événements
                    </div>
                    {grouped.event.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.path)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs flex-none">
                          E
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm text-gray-800 truncate">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="block text-xs text-gray-500 truncate">
                              {item.subtitle}
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Communities */}
                {grouped.community.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Communautés
                    </div>
                    {grouped.community.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.path)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs flex-none">
                          C
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm text-gray-800 truncate">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="block text-xs text-gray-500 truncate">
                              {item.subtitle}
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
