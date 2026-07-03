'use client';
import { useAchievement, ACHIEVEMENTS } from '@/contexts/Passport';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AchievementIcon } from '@/components/ui/AchievementIcon';

// Pre-computed particle positions for premium explosion effect
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
	const angle = (i / 16) * Math.PI * 2 + (i % 3) * 0.2;
	const distance = 90 + (i % 5) * 32;
	return {
		x: Math.cos(angle) * distance,
		y: Math.sin(angle) * distance,
		size: 5 + (i % 3) * 3,
		delay: 0.3 + (i % 7) * 0.05,
	};
});

// Animations
const overlayVariants = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
	exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
};

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.15,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			damping: 18,
			stiffness: 110,
		},
	},
};

const dividerVariants = {
	hidden: { opacity: 0, scaleX: 0 },
	show: {
		opacity: 1,
		scaleX: 1,
		transition: {
			type: 'spring',
			damping: 15,
			stiffness: 90,
			delay: 0.5,
		},
	},
};

const badgeVariants = {
	hidden: { scale: 0, rotate: -30, opacity: 0 },
	show: {
		scale: 1,
		rotate: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			damping: 12,
			stiffness: 140,
			delay: 0.3,
		},
	},
};

export const NewStampCelebration = () => {
	const { newAchievement, dismissAchievement } = useAchievement();
	const { goTo } = useAppFlow();

	const ach = useMemo(() => {
		if (!newAchievement) return null;
		return ACHIEVEMENTS.find((a) => a.key === newAchievement) || null;
	}, [newAchievement]);

	return (
		<AnimatePresence>
			{newAchievement && ach && (
				<motion.div className="stamp-fullscreen-overlay" variants={overlayVariants} initial="hidden" animate="show" exit="exit" style={{ zIndex: 20000 }}>
					{/* Decorative background rings */}
					<div className="stamp-bg-ring stamp-bg-ring--outer" />
					<div className="stamp-bg-ring stamp-bg-ring--inner" />

					{/* Explosive particle effects */}
					<div className="celebration-particles" aria-hidden="true">
						{PARTICLES.map((p, i) => (
							<motion.div
								key={i}
								className="celebration-sparkle"
								style={{ width: p.size, height: p.size, backgroundColor: '#D4AF37' }}
								initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
								animate={{ x: p.x, y: p.y, opacity: [0, 1, 1, 0], scale: 1 }}
								transition={{ duration: 2.0, ease: 'easeOut', delay: p.delay }}
							/>
						))}
					</div>

					{/* Staggered entrance content */}
					<motion.div className="stamp-fullscreen-content" variants={containerVariants} initial="hidden" animate="show">
						{/* Label overline */}
						<motion.p className="stamp-fs-label" variants={itemVariants} style={{ color: '#D4AF37' }}>
							Pencapaian Baru Terbuka!
						</motion.p>

						{/* Giant bouncy achievement medallion */}
						<motion.div variants={badgeVariants} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
							<motion.div
								className="stamp-fs-seal"
								style={{ fontSize: '4.5rem', background: 'radial-gradient(circle, #D4AF37 0%, #aa7c11 100%)', boxShadow: '0 0 40px rgba(212, 175, 55, 0.45)', border: '4px solid #fff' }}
								animate={{
									y: [0, -8, 0],
								}}
								transition={{
									y: {
										repeat: Infinity,
										duration: 3.5,
										ease: 'easeInOut',
									},
								}}
								whileHover={{
									scale: 1.1,
									rotate: 8,
									transition: { type: 'spring', stiffness: 300, damping: 15 },
								}}
							>
								<AchievementIcon id={ach.key} style={{ width: '4rem', height: '4rem', color: '#fff' }} />
								<div className="stamp-fs-seal-gloss" />
							</motion.div>
						</motion.div>

						{/* Achievement Title */}
						<motion.h2 className="stamp-fs-province" variants={itemVariants} style={{ fontSize: '2.2rem', color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
							{ach.title}
						</motion.h2>

						{/* Scale-in divider */}
						<motion.div className="stamp-fs-divider" variants={dividerVariants} style={{ backgroundColor: '#D4AF37' }} />

						{/* Description */}
						<motion.p className="stamp-fs-desc" variants={itemVariants} style={{ maxWidth: '450px', fontSize: '0.95rem' }}>
							Selamat! Kamu baru saja menyelesaikan tantangan petualangan: <br />
							<strong>"{ach.desc}"</strong>
						</motion.p>

						{/* Actions */}
						<motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'center', width: '100%', maxWidth: '400px' }}>
							{/* Primary Action: Go to Achievements page */}
							<motion.button
								className="stamp-fs-btn"
								onClick={() => {
									dismissAchievement();
									goTo('achievement');
								}}
								style={{ flex: 1, backgroundColor: '#D4AF37', color: '#000', fontWeight: '700' }}
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.96, y: 0 }}
							>
								Lihat Pencapaian
							</motion.button>

							{/* Secondary Action: Close and stay on current page */}
							<motion.button
								className="stamp-fs-btn"
								onClick={dismissAchievement}
								style={{ flex: 1, backgroundColor: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff' }}
								whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', y: -2 }}
								whileTap={{ scale: 0.96, y: 0 }}
							>
								Tutup
							</motion.button>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
