"use client";

import { motion, Variants } from "framer-motion";
import { getVideoEmbedUrl } from "@/lib/utils";
import { PlayCircle, AlertCircle, ExternalLink, MonitorPlay } from "lucide-react";
import React from "react";

interface LessonPlayerProps {
  url: string | null;
  title: string;
}

const fadeInUpVisible: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 }
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

export default function LessonPlayer({ url: rawUrl, title }: LessonPlayerProps) {
  const url = rawUrl && !rawUrl.startsWith('http') ? `https://${rawUrl}` : rawUrl;

  if (!url) {
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        variants={fadeInUpVisible}
        className="w-full aspect-video bg-slate-950 rounded-[2.5rem] flex flex-col items-center justify-center text-white gap-6 border border-white/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30" />
        <AlertCircle className="w-16 h-16 text-slate-700 relative z-10" />
        <p className="font-heading font-black text-slate-500 text-xl tracking-tight relative z-10">Sin contenido disponible</p>
      </motion.div>
    );
  }

  const embedUrl = getVideoEmbedUrl(url);
  const isEmbed = embedUrl?.includes("embed") || embedUrl?.includes("player.vimeo.com");
  const isVideoFile = url.match(/\.(mp4|webm|ogg|mov)$|^https:\/\/.*supabase\.co\/storage\/v1\/object\/public\/.*/i) ||
                     url.includes("storage.googleapis.com") || 
                     url.includes("render-video");

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={fadeUp}
      className="w-full aspect-video bg-black rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative group border border-white/5 ring-1 ring-white/10"
    >
      {isEmbed ? (
        <iframe
          src={embedUrl!}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : isVideoFile ? (
        <video
          src={url}
          controls
          className="absolute inset-0 w-full h-full object-contain"
          poster="/video-poster.png"
        >
          Tu navegador no soporta el elemento de video.
        </video>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070')] bg-cover bg-center opacity-20 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          
          <div className="relative z-10 space-y-8 flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(url, '_blank')}
              className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(159,18,57,0.5)] cursor-pointer group/btn overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
              <PlayCircle className="w-12 h-12" />
            </motion.div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-heading font-black tracking-tight leading-none italic">{title}</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto font-medium">
                Este recurso multimedia requiere una visualización externa optimizada para máxima calidad.
              </p>
            </div>

            <motion.a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-2xl"
            >
              <MonitorPlay className="w-5 h-5" /> Abrir en Modo Cine <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      )}
    </motion.div>
  );
}
