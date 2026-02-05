
import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Image as ImageIcon, 
  Rocket, 
  MessageSquare, 
  ShieldCheck, 
  Leaf, 
  Plus, 
  Minus,
  Edit2
} from 'lucide-react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { CAMPAIGNS, SIPATMA_DATA, GALLERY_IMAGES } from './constants';
import { WeekDay, Campaign } from './types';

const firebaseConfig = {
  apiKey: "AIzaSyB03IGZPXGwgmgKp9MOMRWCFxJqm-hkbzc",
  authDomain: "sipatma-2026.firebaseapp.com",
  projectId: "sipatma-2026",
  storageBucket: "sipatma-2026.firebasestorage.app",
  messagingSenderId: "779461369390",
  appId: "1:779461369390:web:7a87a88a40d69461d809bf",
  measurementId: "G-V8ZG0W698F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const CIPA_LOGO_DEFAULT = "https://i.ibb.co/tT7P1s20/image.png";
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá,%20tenho%20uma%20dúvida%20sobre%20a%20SIPATMA%202026";

export default function App() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignPhotoIndex, setCampaignPhotoIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isSipatmaOpen, setIsSipatmaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<WeekDay>('SEGUNDA');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [siteData, setSiteData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
      if (user) {
        document.body.classList.add('is-admin');
      } else {
        document.body.classList.remove('is-admin');
      }
    });

    const unsubSnap = onSnapshot(doc(db, "site_content", "settings"), (snap) => {
      if (snap.exists()) {
        setSiteData(snap.data());
      }
      setLoading(false);
    });

    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);

    return () => {
      unsubAuth();
      unsubSnap();
      clearInterval(timer);
    };
  }, []);

  const handleLogin = async () => {
    const email = window.prompt("Email do Administrador:");
    if (!email) return;
    const pass = window.prompt("Sua Senha:");
    if (!pass) return;

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("Acesso Administrativo Habilitado.");
    } catch (err) {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  const handleLogout = async () => {
    if (confirm("Deseja sair do modo de edição?")) {
      await signOut(auth);
    }
  };

  const editLink = async (field: string) => {
    const newLink = window.prompt("Cole o LINK DIRETO da imagem (ImgBB):", siteData[field] || "");
    if (newLink !== null) {
      try {
        await setDoc(doc(db, "site_content", "settings"), { [field]: newLink.trim() }, { merge: true });
      } catch (err) {
        alert("Erro ao salvar link. Tente novamente.");
      }
    }
  };

  const getImg = (key: string, defaultValue: string) => siteData[key] || defaultValue;

  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);
  const closeCampaignModal = () => { setSelectedCampaign(null); setCampaignPhotoIndex(0); };

  const puzzleImages = [
    getImg("puz_1", "https://i.ibb.co/23RkF1vf/image.png"), 
    getImg("puz_2", "https://i.ibb.co/B27rTNbg/image.png"), 
    getImg("puz_3", "https://i.ibb.co/ynkGstSS/image.png"), 
    getImg("puz_4", "https://i.ibb.co/R4drcYBq/image.png")
  ];
  const puzzleClasses = ["puzzle-tl", "puzzle-tr", "puzzle-bl", "puzzle-br"];

  const AdminEditButton = ({ field, className = "top-2 right-2" }: { field: string, className?: string }) => (
    <button 
      onClick={(e) => { e.stopPropagation(); editLink(field); }}
      className={`admin-control absolute ${className} z-50 bg-yellow-400 text-black p-2 rounded-lg shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-1 font-black text-[10px] border border-black/10`}
    >
      <Edit2 className="w-3 h-3" /> EDITAR
    </button>
  );

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 md:py-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 glass-card p-6 rounded-3xl animate-in fade-in slide-in-from-top duration-700 border-b-2 border-[#FDD835]/20">
        <div className="flex items-center gap-5 mb-4 md:mb-0">
          <div className="bg-white p-2 rounded-full shadow-2xl border-2 border-[#FDD835] overflow-hidden w-20 h-20 flex items-center justify-center shrink-0 relative">
            <img 
              src={getImg("main_logo", CIPA_LOGO_DEFAULT)} 
              alt="Logo CIPA" 
              className="w-14 h-14 object-contain"
            />
            <AdminEditButton field="main_logo" className="-top-1 -right-1 scale-75" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#FDD835] tracking-tight leading-none mb-1">CIPA 2026</h1>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em]">Corteva Agriscience</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight italic">Jornal Digital</h2>
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#FDD835] to-[#FBC02D] text-[#1B5E20] text-[10px] font-black rounded-full mt-1 uppercase shadow-lg">
            Edição Especial SIPATMA
          </span>
        </div>
      </header>

      {/* Slogan Hero */}
      <div className="text-center mb-16 space-y-4">
        <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white drop-shadow-2xl">
          CADA PEÇA IMPORTA,<br />
          <span className="text-[#FDD835] drop-shadow-[0_0_20px_rgba(253,216,53,0.4)]">CADA VIDA CONTA.</span>
        </h3>
        <p className="text-gray-100 max-w-lg mx-auto font-medium text-lg leading-relaxed">
          O compromisso com a vida começa em cada escolha.<br />
          Explore as campanhas e atividades da CIPA 2026.
        </p>
      </div>

      {/* Gallery Carousel */}
      <section className="mb-16 relative group">
        <div className="flex items-center gap-2 mb-4 text-[#FDD835]">
          <ImageIcon className="w-5 h-5" />
          <h4 className="font-bold uppercase tracking-widest text-sm">Ações em Destaque 2025/2026</h4>
        </div>
        <div className="relative h-64 md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-black/20">
          <AdminEditButton field={`carousel_${carouselIndex}`} className="top-6 right-6" />
          {GALLERY_IMAGES.map((img, idx) => (
            <img
              key={idx}
              src={getImg(`carousel_${idx}`, img)}
              alt="Galeria CIPA"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${carouselIndex === idx ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="font-black text-2xl md:text-4xl drop-shadow-lg mb-1">Segurança que Transforma</p>
            <p className="text-[#FDD835] text-sm md:text-base font-bold uppercase tracking-[0.2em] opacity-90 italic">Cultura de Prevenção Corteva</p>
          </div>
          <button onClick={() => setCarouselIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/30 backdrop-blur-xl hover:bg-[#FDD835] hover:text-[#1B5E20] text-white rounded-2xl transition-all hidden group-hover:block"><ChevronLeft className="w-6 h-6" /></button>
          <button onClick={() => setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/30 backdrop-blur-xl hover:bg-[#FDD835] hover:text-[#1B5E20] text-white rounded-2xl transition-all hidden group-hover:block"><ChevronRight className="w-6 h-6" /></button>
        </div>
      </section>

      {/* Campaign Grid */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8 text-[#FDD835]">
          <Calendar className="w-6 h-6" />
          <h4 className="font-black uppercase tracking-[0.2em] text-xs">Cronograma de Campanhas Mensais</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {CAMPAIGNS.map((campaign) => (
            <button key={campaign.id} onClick={() => setSelectedCampaign(campaign)} className="relative p-6 rounded-[1.5rem] font-bold transition-all duration-300 text-sm text-left glass-card hover:bg-white/20 text-white hover:scale-105 border-b-4 border-transparent hover:border-[#FDD835] group overflow-hidden">
              <AdminEditButton field={`month_thumb_${campaign.id}`} className="top-1 right-1 scale-50" />
              <img 
                src={getImg(`month_thumb_${campaign.id}`, `https://picsum.photos/seed/month${campaign.id}/300/200`)} 
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-opacity" 
                loading="lazy"
              />
              <div className="relative z-10">
                <span className="text-[9px] opacity-40 block mb-1 uppercase font-black tracking-[0.2em]">Mês {campaign.id}</span>
                <span className="text-xl font-black block group-hover:text-[#FDD835] transition-colors">{campaign.month}</span>
                <div className="mt-4 h-1 w-8 rounded-full bg-[#FDD835] transition-all group-hover:w-full" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* The Hub SIPATMA */}
      <section className="mb-20">
        <div className="glass-card p-14 rounded-[4rem] text-center border-2 border-[#FDD835]/40 relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FDD835]/10 rounded-full blur-[100px]" />
          <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-[#FDD835] to-[#FBC02D] rounded-[2.5rem] mb-10 shadow-2xl transform hover:rotate-12 transition-transform"><Rocket className="w-16 h-16 text-[#1B5E20]" /></div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-white drop-shadow-lg">SIPATMA 2026</h2>
          <p className="text-gray-100 mb-12 max-w-lg mx-auto text-xl font-medium leading-relaxed">Acesse o painel exclusivo da Semana Interna de Prevenção de Acidentes: Missões, Cronograma e muito mais.</p>
          <button onClick={() => setIsSipatmaOpen(!isSipatmaOpen)} className={`px-14 py-8 bg-[#FDD835] text-[#1B5E20] rounded-[2.5rem] font-black text-3xl uppercase tracking-tighter animate-pulse-gold hover:scale-110 transition-transform active:scale-95 flex items-center gap-5 mx-auto ${isSipatmaOpen ? 'ring-8 ring-white shadow-[0_0_50px_#FDD835]' : ''}`}>{isSipatmaOpen ? 'FECHAR HUB' : 'ACESSAR SIPATMA 2026'}</button>

          {isSipatmaOpen && (
            <div className="mt-20 text-left space-y-20 animate-in fade-in slide-in-from-bottom duration-1000">
              {/* Cronograma */}
              <div>
                <h5 className="flex items-center gap-4 font-black mb-10 text-[#FDD835] tracking-[0.3em] text-xs"><Calendar className="w-6 h-6" /> CRONOGRAMA DE PALESTRAS</h5>
                <div className="flex flex-wrap gap-4 mb-10">
                  {SIPATMA_DATA.map((item) => (
                    <button key={item.day} onClick={() => setActiveTab(item.day)} className={`px-8 py-4 rounded-[1.5rem] text-[11px] font-black tracking-[0.2em] transition-all uppercase ${activeTab === item.day ? 'bg-white text-[#1B5E20] shadow-2xl scale-110 border-transparent' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/10 backdrop-blur-md'}`}>{item.day}</button>
                  ))}
                </div>
                <div className="glass-card p-12 rounded-[3.5rem] border-l-[12px] border-[#FDD835] shadow-2xl relative">
                  {SIPATMA_DATA.filter(d => d.day === activeTab).map((dayData) => (
                    <div key={dayData.day} className="animate-in fade-in zoom-in duration-700 relative z-10 text-white">
                      <div className="flex items-center gap-5 mb-6"><div className={`w-5 h-5 rounded-full ${dayData.color} shadow-[0_0_20px_rgba(255,255,255,0.4)]`} /><span className="text-[11px] font-black opacity-40 tracking-[0.4em] uppercase">{dayData.day} • TEMA DO DIA</span></div>
                      <h6 className="text-4xl md:text-5xl font-black mb-6 leading-none tracking-tight">{dayData.theme}</h6>
                      <p className="text-gray-100 leading-relaxed font-medium text-xl max-w-2xl">{dayData.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PASSAPORTE DIGITAL - QUEBRA-CABEÇA 2x2 CORRIGIDO */}
              <div className="p-10 bg-gradient-to-br from-[#FDD835] to-[#FBC02D] rounded-[4rem] text-[#1B5E20] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                  
                  <div className="shrink-0 relative">
                    {/* Placeholder backgrounds para evitar a caixa branca antes do carregamento */}
                    <div className="grid grid-cols-2 gap-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-[#1B5E20]/20">
                      {puzzleImages.map((src, index) => (
                        <div 
                          key={index} 
                          className={`w-32 h-32 relative overflow-hidden ${puzzleClasses[index]} bg-black/10`}
                        >
                          <AdminEditButton field={`puz_${index + 1}`} className="top-1 right-1 scale-75" />
                          <img 
                            src={src} 
                            alt={`Peça ${index + 1}`} 
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-2xl scale-75 border-2 border-[#1B5E20] relative">
                      <img src={getImg("main_logo", CIPA_LOGO_DEFAULT)} className="w-12 h-12 object-contain" />
                    </div>
                  </div>

                  <div>
                    <h5 className="text-4xl font-black mb-4 tracking-tighter uppercase italic leading-none">Passaporte Digital 2026</h5>
                    <p className="text-xl font-bold opacity-90 leading-tight max-w-lg mb-4">
                      Excelente! Suas peças se encaixam perfeitamente. Você concluiu as missões da SIPATMA.
                    </p>
                    <div className="bg-[#1B5E20] text-white inline-block px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest shadow-xl">
                      APTO PARA O SORTEIO FINAL
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-20 pt-10 space-y-12 border-t border-white/10 mt-20">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-5 bg-white/5 p-3 pl-8 rounded-full border border-white/10 backdrop-blur-xl">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 italic">Powered by</span>
            <div className="flex gap-4 pr-4">
              <div className="bg-white p-2 rounded-full shadow-2xl w-14 h-14 flex items-center justify-center transform hover:scale-125 transition-transform">
                <img src={getImg("main_logo", CIPA_LOGO_DEFAULT)} className="w-10 h-10 object-contain" />
              </div>
              <div className="bg-white p-3 rounded-full shadow-2xl w-14 h-14 flex items-center justify-center transform hover:scale-125 transition-transform text-[#1B5E20]">
                <ShieldCheck className="w-8 h-8" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            {!isAdmin ? (
              <button 
                id="btn-login"
                onClick={handleLogin}
                className="text-[10px] font-bold text-white/20 hover:text-white/60 uppercase tracking-widest transition-colors cursor-pointer p-4"
              >
                Login Admin
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors cursor-pointer p-4"
              >
                Sair do Modo Admin
              </button>
            )}
            <div className="space-y-3">
              <p className="text-[12px] font-black uppercase tracking-[0.6em] text-[#FDD835]">Corteva Agriscience • CIPA 2026</p>
              <p className="text-[11px] text-white/40 max-w-md mx-auto font-medium uppercase leading-relaxed tracking-widest italic">Segurança, Saúde e Sustentabilidade.<br />Um compromisso de todos, para todos.</p>
            </div>
          </div>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-12 py-6 bg-[#25D366] text-white rounded-[2.5rem] font-black text-xl hover:bg-white hover:text-[#25D366] transition-all shadow-[0_20px_50px_rgba(37,211,102,0.3)] border-4 border-transparent hover:border-[#25D366]"><MessageSquare className="w-7 h-7 group-hover:scale-125 transition-transform" />Central de Dúvidas CIPA</a>
        </div>
      </footer>

      {/* Campaign Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-[#064e3b] via-[#0f172a] to-[#312e81] w-full max-w-2xl max-h-[92vh] rounded-[3.5rem] overflow-hidden flex flex-col relative border-2 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            <button onClick={closeCampaignModal} className="absolute top-8 right-8 z-[110] p-4 bg-black/40 hover:bg-red-500 text-white rounded-[1.5rem] transition-all hover:rotate-90 shadow-2xl"><X className="w-7 h-7" /></button>
            <div className="p-10 md:p-14 overflow-y-auto custom-scrollbar">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-3 h-10 bg-[#FDD835] rounded-full shadow-[0_0_15px_#FDD835]" />
                   <span className="text-[#FDD835] font-black uppercase tracking-[0.4em] text-[11px]">{selectedCampaign.month} 2026</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter drop-shadow-xl">{selectedCampaign.title}</h3>
              </div>
              <div className="relative mb-16">
                <div className="absolute -left-8 top-0 bottom-0 w-2 bg-gradient-to-b from-[#FDD835] to-transparent rounded-full opacity-40" />
                <p className="text-white text-2xl md:text-4xl leading-tight font-semibold italic pl-6 tracking-tight">"{selectedCampaign.description}"</p>
              </div>
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4 text-[#FDD835]"><ImageIcon className="w-7 h-7" /><h4 className="font-black uppercase tracking-[0.3em] text-[11px]">Galeria do Informativo</h4></div>
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Registro {campaignPhotoIndex + 1} / 3</span>
                </div>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black/80 border-4 border-white/5 shadow-inner">
                  <AdminEditButton field={`campaign_detail_${selectedCampaign.id}_${campaignPhotoIndex}`} />
                  <img 
                    src={getImg(`campaign_detail_${selectedCampaign.id}_${campaignPhotoIndex}`, `https://picsum.photos/seed/${selectedCampaign.id}-${campaignPhotoIndex}/1400/900`)} 
                    alt="Registro" 
                    className="w-full h-full object-cover animate-in fade-in duration-1000" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
