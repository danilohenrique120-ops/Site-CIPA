
import { Campaign, SipatmaDay } from './types';

export const CAMPAIGNS: Campaign[] = [
  { id: 1, month: 'Janeiro', title: 'Janeiro Branco', description: 'Foco na saúde mental e bem-estar emocional de todos os colaboradores.' },
  { id: 2, month: 'Fevereiro', title: 'Carnaval com Segurança', description: 'Orientações para descanso e diversão segura dentro e fora da fábrica.' },
  { id: 3, month: 'Março', title: 'Uso Consciente de EPIs', description: 'Revisão técnica sobre a importância e conservação dos equipamentos de proteção.' },
  { id: 4, month: 'Abril', title: 'Abril Verde', description: 'Mês de conscientização sobre segurança e saúde no trabalho.' },
  { id: 5, month: 'Maio', title: 'Maio Amarelo', description: 'Atenção pela vida no trânsito: segurança nos trajetos de entrada e saída.' },
  { id: 6, month: 'Junho', title: 'Meio Ambiente', description: 'Preservação de recursos e descarte correto de resíduos industriais.' },
  { id: 7, month: 'Julho', title: 'Ergonomia', description: 'Postura correta e pausas ativas para evitar lesões por esforço repetitivo.' },
  { id: 8, month: 'Agosto', title: 'Agosto Lilás', description: 'Conscientização pelo fim da violência contra a mulher e apoio psicossocial.' },
  { id: 9, month: 'Setembro', title: 'Setembro Amarelo', description: 'Prevenção ao suicídio e promoção de um ambiente de trabalho acolhedor.' },
  { id: 10, month: 'Outubro', title: 'Outubro Rosa', description: 'Saúde preventiva da mulher e diagnóstico precoce do câncer de mama.' },
  { id: 11, month: 'Novembro', title: 'Novembro Azul', description: 'Saúde do homem e prevenção ao câncer de próstata.' },
  { id: 12, month: 'Dezembro', title: 'Dezembro Vermelho', description: 'Prevenção às ISTs e conscientização sobre a vida.' },
];

export const SIPATMA_DATA: SipatmaDay[] = [
  { day: 'SEGUNDA', theme: 'Segurança em Primeiro Lugar', color: 'bg-blue-600', content: 'Abertura oficial com foco em percepção de riscos e zero acidentes.' },
  { day: 'TERÇA', theme: 'Saúde Mental & Equilíbrio', color: 'bg-purple-600', content: 'Workshop sobre resiliência emocional e gestão de stress no ambiente corporativo.' },
  { day: 'QUARTA', theme: 'Família & Tecnologia', color: 'bg-orange-600', content: 'Inovação aplicada à segurança e convite especial para as famílias conhecerem nossos protocolos.' },
  { day: 'QUINTA', theme: 'Meio Ambiente & Sustentabilidade', color: 'bg-green-600', content: 'Encerramento com foco na pegada ecológica e futuro sustentável Corteva.' },
];

export const GALLERY_IMAGES = [
  'https://picsum.photos/seed/sipatma1/800/400',
  'https://picsum.photos/seed/sipatma2/800/400',
  'https://picsum.photos/seed/sipatma3/800/400',
  'https://picsum.photos/seed/sipatma4/800/400',
];
