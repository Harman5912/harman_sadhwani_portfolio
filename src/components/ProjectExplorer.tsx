import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ExternalLink,
  BarChart3,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  projectsData,
  catalogueDomains,
  Project,
} from '../data/projects';
import { LuxurySectionHeading } from './GoldenSunMotif';
import { PixelScrambleText, PixelTransitionPanel } from './GlassEffects';

interface MinorProjectEntry {
  id: string;
  name: string;
  category: string;
  divisionCode: string;
  description?: string;
  technologies?: string[];
  status?: string;
  link?: string;
  lumScore: number;
}

const ITEMS_PER_PAGE = 6;

export default function ProjectExplorer({
  onTriggerKeysAiEasterEgg,
  onTriggerSolarEasterEgg,
}: {
  onTriggerKeysAiEasterEgg: (project: Project) => void;
  onTriggerSolarEasterEgg: () => void;
}) {
  const [activeDivisionId, setActiveDivisionId] = useState<string>('minor-lab');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'waterfall'>('grid');
  const [page, setPage] = useState(0);

  // Build unified Category Divisions including True Blade & all other remaining minor projects
  const divisions = useMemo(() => {
    const remainingProjects = projectsData.filter(
      (p) =>
        p.id !== 'keys-ai' &&
        p.id !== 'reviewbot' &&
        p.id !== 'crown-code-terminal-agent'
    );

    const minorLabItems: MinorProjectEntry[] = remainingProjects.map(
      (p, idx) => {
        const hash = p.name
          .split('')
          .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
        return {
          id: p.id,
          name: p.name,
          category: p.category,
          divisionCode: 'MIN',
          description: p.description,
          technologies: p.technologies,
          status: p.status,
          link: p.demo || p.github,
          lumScore: 60 + ((hash * 7 + idx * 11) % 35),
        };
      }
    );

    const catalogueDivisions = catalogueDomains.map((dom) => {
      const entries: MinorProjectEntry[] = dom.projects.map(
        (projName: string, idx: number) => {
          const hash = projName
            .split('')
            .reduce((acc: number, ch: string) => acc + ch.charCodeAt(0), 0);
          return {
            id: `${dom.id}-${idx}`,
            name: projName,
            category: dom.label,
            divisionCode: dom.code,
            status: 'Completed',
            lumScore: 56 + ((hash * 11 + idx * 7) % 43),
          };
        }
      );
      return {
        id: dom.id,
        code: dom.code,
        label: dom.label,
        items: entries,
      };
    });

    return [
      {
        id: 'minor-lab',
        code: 'MIN',
        label: 'Applied & Prototype Builds',
        items: minorLabItems,
      },
      ...catalogueDivisions,
    ];
  }, []);

  const activeDivision =
    divisions.find((d) => d.id === activeDivisionId) || divisions[0];

  const totalMinorCount = useMemo(
    () => divisions.reduce((sum, d) => sum + d.items.length, 0),
    [divisions]
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(0);
    const trimmed = value.trim().toLowerCase();

    if (trimmed === 'keys.ai') {
      const keysProj = projectsData.find((p) => p.id === 'keys-ai');
      if (keysProj) onTriggerKeysAiEasterEgg(keysProj);
    }
    if (trimmed === 'sun') {
      onTriggerSolarEasterEgg();
    }
  };

  const displayedItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeDivision.items;

    const allItems = divisions.flatMap((d) => d.items);
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        (item.technologies || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery, activeDivision, divisions]);

  const totalPages = Math.max(1, Math.ceil(displayedItems.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (page >= totalPages) {
      setPage(0);
    }
  }, [page, totalPages]);

  const pagedItems = useMemo(
    () =>
      displayedItems.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    [displayedItems, page]
  );

  return (
    <div className="w-full space-y-3.5">
      {/* Compact Header + Search + View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2.5">
        <LuxurySectionHeading
          align="left"
          kicker="04. Minor Projects & Category Divisions"
          title={
            <>
              Minor <span className="gold-text">Projects</span> Catalogue
            </>
          }
          subtitle={`${totalMinorCount} minor projects organized by category division across ${divisions.length} project types.`}
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#12110e] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Filter minor projects..."
              aria-label="Filter minor projects"
              className="pl-8 pr-3 py-1.5 border-2 border-[#12110e] bg-white font-mono text-xs text-[#12110e] placeholder:text-[#12110e]/50 focus:outline-none shadow-[3px_3px_0px_#d4af37]"
            />
          </div>

          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 border-2 border-[#12110e] font-mono text-xs font-bold uppercase cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#12110e] text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37]'
                : 'bg-white text-[#12110e] hover:bg-[#fcf6b5]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Voxel Cards</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('waterfall')}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 border-2 border-[#12110e] font-mono text-xs font-bold uppercase cursor-pointer ${
              viewMode === 'waterfall'
                ? 'bg-[#12110e] text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37]'
                : 'bg-white text-[#12110e] hover:bg-[#fcf6b5]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Waterfall</span>
          </button>
        </div>
      </div>

      {/* Main 12-Col Viewport-Fitted Explorer (No Scrollbars — All 14 Divisions & 6 Paginated Cards Fit Inside Viewport) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left 5-Col: All 14 Project Type Divisions in a 2-Column Matrix */}
        <div className="lg:col-span-5 border-2 border-[#12110e] bg-white p-2.5 shadow-[6px_6px_0px_#12110e] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#12110e] bg-[#12110e] px-3 py-1.5 font-mono text-[11px] font-bold text-[#fcf6b5] mb-2">
              <span>PROJECT DIVISIONS ({divisions.length})</span>
              <span className="text-[#d4af37]">{totalMinorCount} TOTAL</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {divisions.map((div, idx) => {
                const isSelected =
                  !searchQuery.trim() && div.id === activeDivision.id;
                return (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveDivisionId(div.id);
                      setPage(0);
                    }}
                    className={`w-full flex items-center justify-between gap-1.5 px-2 py-1.5 text-left font-mono text-[11px] transition-colors cursor-pointer border ${
                      isSelected
                        ? 'border-[#12110e] bg-[#12110e] text-[#fcf6b5] font-bold shadow-[2px_2px_0px_#d4af37]'
                        : 'border-[#12110e]/25 bg-[#f8f5ec] text-[#12110e]/85 hover:border-[#12110e] hover:bg-[#fcf6b5]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`text-[9px] font-bold shrink-0 ${
                          isSelected ? 'text-[#d4af37]' : 'text-[#b8860b]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{div.label}</span>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] font-bold ${
                        isSelected ? 'text-[#d4af37]' : 'text-[#12110e]/50'
                      }`}
                    >
                      {div.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#12110e]/20 flex items-center justify-between font-mono text-[10px] text-[#12110e]/70">
            <span>CATEGORY DIVISION MATRIX</span>
            <span className="font-bold text-[#b8860b]">
              ACTIVE: {activeDivision.code}
            </span>
          </div>
        </div>

        {/* Right 7-Col: Paginated Minor Projects Display (Zero Scrollbar — Fits 100% Inside Viewport) */}
        <div className="lg:col-span-7">
          <PixelTransitionPanel
            activeKey={`${activeDivision.id}-${viewMode}-${searchQuery}-${page}`}
          >
            <div className="border-2 border-[#12110e] bg-white p-3.5 shadow-[8px_8px_0px_#d4af37] space-y-3 h-full flex flex-col justify-between">
              {/* Top Division Bar + Page Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#12110e] pb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#12110e] text-[#fcf6b5] font-mono text-[10px] font-bold px-2 py-0.5">
                    {searchQuery.trim() ? 'SEARCH' : activeDivision.code}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-black text-[#12110e]">
                    <PixelScrambleText
                      text={
                        searchQuery.trim()
                          ? `Filtered Results (${displayedItems.length})`
                          : activeDivision.label
                      }
                    />
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    aria-label="Previous project page"
                    className="border border-[#12110e] bg-[#f8f5ec] p-1 text-[#12110e] disabled:opacity-35 hover:bg-[#fcf6b5] cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] font-bold text-[#12110e] px-1.5">
                    PAGE {page + 1} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= totalPages - 1}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    aria-label="Next project page"
                    className="border border-[#12110e] bg-[#f8f5ec] p-1 text-[#12110e] disabled:opacity-35 hover:bg-[#fcf6b5] cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bounded 6-Card Grid or Waterfall */}
              <div>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pagedItems.map((item, idx) => {
                      const globalIdx = page * ITEMS_PER_PAGE + idx + 1;
                      return (
                        <article
                          key={item.id}
                          className="border-2 border-[#12110e] bg-[#f8f5ec] text-[#12110e] p-3 shadow-[3px_3px_0px_#12110e] hover:bg-white transition-all flex flex-col justify-between pixel-hover-streak"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between font-mono text-[9px]">
                              <span className="font-bold text-[#b8860b] truncate">
                                {item.divisionCode}.
                                {String(globalIdx).padStart(2, '0')} ·{' '}
                                {item.category}
                              </span>
                              <span className="font-bold shrink-0">
                                LUM:{item.lumScore}%
                              </span>
                            </div>
                            <h4 className="font-display text-sm font-bold leading-snug truncate">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-[11px] opacity-80 line-clamp-1 leading-snug">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="mt-2 pt-1.5 border-t border-current/15 flex items-center justify-between font-mono text-[9px]">
                            <span className="truncate max-w-[170px] opacity-75">
                              {item.technologies
                                ? item.technologies.slice(0, 3).join(' · ')
                                : item.status || item.category}
                            </span>
                            {item.link ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-bold text-[#b8860b] hover:underline"
                              >
                                <span>Open</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-[#b8860b] font-bold">■</span>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pagedItems.map((item, idx) => {
                      const globalIdx = page * ITEMS_PER_PAGE + idx + 1;
                      return (
                        <div
                          key={item.id}
                          className="border border-[#12110e] bg-[#f8f5ec] p-2 flex items-center gap-3"
                        >
                          <span className="font-mono text-[10px] font-bold text-[#12110e] w-6 shrink-0">
                            {String(globalIdx).padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-xs font-bold text-[#12110e] mb-1">
                              <span className="truncate">
                                {item.name}{' '}
                                <span className="font-mono text-[9px] font-normal text-[#b8860b]">
                                  · {item.category}
                                </span>
                              </span>
                              <span className="font-mono text-[9px] text-[#b8860b] shrink-0">
                                {item.lumScore}%
                              </span>
                            </div>
                            <div className="h-2 w-full bg-white border border-[#12110e] overflow-hidden">
                              <div
                                className="h-full pixel-sort-bar-h"
                                style={{ width: `${item.lumScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Summary Strip */}
              <div className="pt-2 border-t border-[#12110e]/20 flex items-center justify-between font-mono text-[10px] text-[#12110e]/75">
                <span>
                  SHOWING {pagedItems.length} OF {displayedItems.length} PROJECTS IN DIVISION
                </span>
                <span className="font-bold text-[#b8860b]">
                  STEADY VIEWPORT MATRIX
                </span>
              </div>
            </div>
          </PixelTransitionPanel>
        </div>
      </div>
    </div>
  );
}
