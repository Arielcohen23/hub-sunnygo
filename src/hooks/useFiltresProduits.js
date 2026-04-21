import { useMemo } from 'react'
import useAdminData from './useAdminData'

const filtres = {
  vedette:            p => p.enVedette && !p.archive,
  cee:                p => p.categorie === 'CEE' && !p.archive,
  pv:                 p => p.categorie === 'PV' && !p.archive,
  courtage:           p => p.categorie === 'Courtage' && !p.archive,
  tiers:              p => p.categorie === 'TiersInvestissement' && !p.archive,
  particulier:        p => p.typeClient.includes('particulier') && !p.archive,
  'pro-tous':         p => p.typeClient.includes('professionnel') && !p.archive,
  'pro-industriel':   p => p.typeClient.includes('professionnel') && p.secteurs.includes('industriel') && !p.archive,
  'pro-tertiaire':    p => p.typeClient.includes('professionnel') && p.secteurs.includes('tertiaire') && !p.archive,
  'pro-agriculteur':  p => p.typeClient.includes('professionnel') && p.secteurs.includes('agriculteur') && !p.archive,
  'pro-collectivite': p => p.typeClient.includes('professionnel') && p.secteurs.includes('collectivite') && !p.archive,
  'archives':         p => p.archive === true,
}

const labels = {
  vedette:            'Produits du moment',
  cee:                "CEE — Économies d'Énergie",
  pv:                 'Panneaux Photovoltaïques',
  courtage:           'Courtage en Énergie',
  tiers:              'Tiers Investissement PV',
  particulier:        'Particulier',
  'pro-tous':         'Professionnel — Tous',
  'pro-industriel':   'Professionnel — Industriel',
  'pro-tertiaire':    'Professionnel — Tertiaire',
  'pro-agriculteur':  'Professionnel — Agriculteur',
  'pro-collectivite': 'Professionnel — Collectivités',
  'archives':         'Produits archivés',
}

export default function useFiltresProduits(selectedKey) {
  const { produits } = useAdminData()

  const filteredProducts = useMemo(() => {
    const fn = filtres[selectedKey]
    if (!fn) return produits
    return produits.filter(fn)
  }, [selectedKey, produits])

  return {
    filteredProducts,
    filterLabel: labels[selectedKey] || 'Tous les produits',
  }
}
