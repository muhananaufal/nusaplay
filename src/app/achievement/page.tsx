'use client';
import { useState, useEffect, useMemo } from 'react';
import { useAchievement, ACHIEVEMENTS } from '@/contexts/Passport';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { motion } from 'framer-motion';
import { AchievementIcon } from '@/components/ui/AchievementIcon';
import { SearchIcon } from '@/components/ui/PremiumIcons';

const StatsCountUp = ({ end }: { end: number }) => {
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		let frameId: number;
		const startTime = performance.now();
		const cycleDuration = 1000; // 1s of random cycling
		const settleDuration = 500; // 0.5s of smooth settling to actual number

		const animate = (now: number) => {
			const elapsed = now - startTime;

			if (elapsed < cycleDuration) {
				// Phase 1: Cycle through completely random numbers
				const maxRand = Math.max(99, end * 4);
				const randomNum = Math.floor(Math.random() * maxRand);
				setDisplayValue(randomNum);
				frameId = requestAnimationFrame(animate);
			} else if (elapsed < cycleDuration + settleDuration) {
				// Phase 2: Settle down to the target number
				const settleProgress = (elapsed - cycleDuration) / settleDuration;
				const ease = settleProgress * (2 - settleProgress); // easeOut
				const current = Math.floor(ease * end);
				setDisplayValue(current);
				frameId = requestAnimationFrame(animate);
			} else {
				setDisplayValue(end);
			}
		};

		frameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frameId);
	}, [end]);

	return <span>{displayValue}</span>;
};

export default function AchievementPage() {
	const { unlockedAchievements, completedQuizzes, perfectQuizzes } = useAchievement();
	const { visitedByProvince, listenedByProvince, goTo } = useAppFlow();

	useEffect(() => {
		goTo('achievement', true);
	}, [goTo]);

	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 9;

	// Reset page when search query changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const filteredAchievements = useMemo(() => {
		if (!searchQuery.trim()) return ACHIEVEMENTS;
		const q = searchQuery.toLowerCase().trim();
		return ACHIEVEMENTS.filter((ach) => ach.title.toLowerCase().includes(q) || ach.desc.toLowerCase().includes(q));
	}, [searchQuery]);

	const totalPages = Math.ceil(filteredAchievements.length / itemsPerPage) || 1;

	const paginatedAchievements = useMemo(() => {
		return filteredAchievements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	}, [filteredAchievements, currentPage]);

	// Calculations for stats
	let totalListened = 0;
	Object.values((listenedByProvince as Record<string, string[]>) || {}).forEach((list) => {
		totalListened += list.length;
	});

	let totalVisited = 0;
	Object.values((visitedByProvince as Record<string, string[]>) || {}).forEach((list) => {
		totalVisited += list.length;
	});

	const unlockedCount = unlockedAchievements.size;
	const totalCount = ACHIEVEMENTS.length;
	const progressPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } },
	};

	return (
		<div className="achievement-page">
			<button className="floating-back-btn" onClick={() => goTo(PHASES.MAP)} style={{ zIndex: 10000 }}>
				<span>&larr;</span>
				<span>
					KEMBALI<span className="back-btn-map-text"> KE PETA</span>
				</span>
			</button>

			<div className="achievement-container">
				{/* Header Section Group */}
				<div className="achievement-header" style={{ gap: '16px' }}>
					<span className="achievement-overline">Petualangan NusaPlay</span>
					<h1 className="achievement-title">Pencapaian Nusantara</h1>
					<p className="achievement-desc">
						Lacak penghargaan dan keahlian budaya yang telah kamu kuasai selama bertualang melintasi kepulauan Indonesia.
					</p>

					{/* Sleek inline progress bar under subtitle */}
					<div className="achievement-sleek-progress" style={{ width: '100%', maxWidth: '480px', margin: '8px auto 0 auto' }}>
						<div style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--c-text-soft)', marginBottom: '8px' }}>
							<span>Progres Petualangan:</span>
							<span style={{ fontWeight: 600, color: 'var(--c-primary)' }}>{unlockedCount} / {totalCount} Terbuka ({progressPercent}%)</span>
						</div>
						<div className="progress-bar-bg-sleek">
							<motion.div 
								className="progress-bar-fill-sleek" 
								initial={{ width: 0 }} 
								animate={{ width: `${progressPercent}%` }} 
								transition={{ duration: 0.8, ease: 'easeOut' }} 
							/>
						</div>
					</div>

					{/* Minimal Stats Row */}
					<div className="achievement-stats-row-sleek" style={{ marginTop: '8px' }}>
						<div className="stat-chip-sleek">
							<span className="stat-num-sleek"><StatsCountUp end={totalVisited} /></span>
							<span className="stat-label-sleek">Budaya Dilihat</span>
						</div>
						<div className="stat-divider-sleek">•</div>
						<div className="stat-chip-sleek">
							<span className="stat-num-sleek"><StatsCountUp end={totalListened} /></span>
							<span className="stat-label-sleek">Audio Disimak</span>
						</div>
						<div className="stat-divider-sleek">•</div>
						<div className="stat-chip-sleek">
							<span className="stat-num-sleek"><StatsCountUp end={completedQuizzes.size} /></span>
							<span className="stat-label-sleek">Kuis Selesai</span>
						</div>
						<div className="stat-divider-sleek">•</div>
						<div className="stat-chip-sleek">
							<span className="stat-num-sleek"><StatsCountUp end={perfectQuizzes.size} /></span>
							<span className="stat-label-sleek">Skor Sempurna</span>
						</div>
					</div>

					{/* Search Control */}
					<motion.div
						className={`cl-search-wrapper quiz-search-wrapper achievement-search-wrapper ${searchQuery ? 'has-query' : ''}`}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.15, duration: 0.5 }}
					>
						<SearchIcon size={16} />
						<input
							type="text"
							placeholder="Cari pencapaian..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{searchQuery && (
							<button className="cl-search-clear" onClick={() => setSearchQuery('')}>&times;</button>
						)}
					</motion.div>
				</div>

				{/* Achievements Grid */}
				{filteredAchievements.length === 0 ? (
					<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--c-text-soft)', width: '100%' }}>
						<p>Pencapaian dengan kriteria pencarian tidak ditemukan.</p>
					</motion.div>
				) : (
					<div>
						<motion.div className="achievements-grid" variants={containerVariants} initial="hidden" animate="show">
							{paginatedAchievements.map((ach) => {
								const isUnlocked = unlockedAchievements.has(ach.key);

								return (
									<motion.div key={ach.key} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`} variants={itemVariants} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
										<div className="achievement-card-icon-wrap">
											<AchievementIcon id={ach.key} className="achievement-card-icon" />
										</div>

										<div className="achievement-card-content">
											<h3 className="achievement-card-title">{ach.title}</h3>
											<p className="achievement-card-desc">{ach.desc}</p>
											<span className={`achievement-card-status ${isUnlocked ? 'status-unlocked' : 'status-locked'}`}>{isUnlocked ? 'Terbuka' : 'Terkunci'}</span>
										</div>
									</motion.div>
								);
							})}
						</motion.div>

						{/* Inline Page Pagination Controls */}
						{totalPages > 1 && (
							<div className="cl-pagination" style={{ marginTop: '30px' }}>
								<button
									disabled={currentPage === 1}
									onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
									className="cl-page-arrow"
								>
									&larr; Prev
								</button>
								<span className="cl-page-indicator">
									Halaman {currentPage} dari {totalPages}
								</span>
								<button
									disabled={currentPage === totalPages}
									onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
									className="cl-page-arrow"
								>
									Next &rarr;
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
