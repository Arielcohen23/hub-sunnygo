import { useState, useEffect, useCallback } from 'react'
import { produits as defaultProduits } from '../data/produits'

const PRODUITS_KEY = 'sunnygo_produits'
const APPARENCE_KEY = 'sunnygo_apparence'

const defaultApparence = {
  titreHero: 'Le Hub SunnyGo',
  sousTitreHero: "L'espace dédié à nos apporteurs d'affaires",
  titreProduitsMoment: '🔥 Produits du moment',
  stats: [
    { val: '+ 30', label: "apporteurs d'affaires partout en France", yellow: false },
    { val: '9', label: 'produits disponibles sur le Hub', yellow: false },
    { val: '24h', label: 'délai de traitement des dossiers maximum', yellow: true },
  ],
}

function loadProduits() {
  try {
    const stored = localStorage.getItem(PRODUITS_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return defaultProduits
}

function loadApparence() {
  try {
    const stored = localStorage.getItem(APPARENCE_KEY)
    if (stored) return { ...defaultApparence, ...JSON.parse(stored) }
  } catch {}
  return defaultApparence
}

export default function useAdminData() {
  const [produits, setProduits] = useState(loadProduits)
  const [apparence, setApparence] = useState(loadApparence)

  useEffect(() => {
    function onStorage(e) {
      if (e.key === PRODUITS_KEY || e.key === null) {
        setProduits(loadProduits())
      }
      if (e.key === APPARENCE_KEY || e.key === null) {
        setApparence(loadApparence())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const saveProduits = useCallback((data) => {
    localStorage.setItem(PRODUITS_KEY, JSON.stringify(data))
    setProduits(data)
    window.dispatchEvent(new StorageEvent('storage', { key: PRODUITS_KEY }))
  }, [])

  const saveApparence = useCallback((data) => {
    localStorage.setItem(APPARENCE_KEY, JSON.stringify(data))
    setApparence(data)
    window.dispatchEvent(new StorageEvent('storage', { key: APPARENCE_KEY }))
  }, [])

  const updateProduit = useCallback((id, updates) => {
    setProduits(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updates } : p)
      localStorage.setItem(PRODUITS_KEY, JSON.stringify(updated))
      window.dispatchEvent(new StorageEvent('storage', { key: PRODUITS_KEY }))
      return updated
    })
  }, [])

  const addProduit = useCallback((produit) => {
    setProduits(prev => {
      const updated = [...prev, produit]
      localStorage.setItem(PRODUITS_KEY, JSON.stringify(updated))
      window.dispatchEvent(new StorageEvent('storage', { key: PRODUITS_KEY }))
      return updated
    })
  }, [])

  const deleteProduit = useCallback((id) => {
    setProduits(prev => {
      const updated = prev.filter(p => p.id !== id)
      localStorage.setItem(PRODUITS_KEY, JSON.stringify(updated))
      window.dispatchEvent(new StorageEvent('storage', { key: PRODUITS_KEY }))
      return updated
    })
  }, [])

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(PRODUITS_KEY)
    localStorage.removeItem(APPARENCE_KEY)
    setProduits(defaultProduits)
    setApparence(defaultApparence)
    window.dispatchEvent(new StorageEvent('storage', { key: null }))
  }, [])

  return {
    produits,
    apparence,
    saveProduits,
    saveApparence,
    updateProduit,
    addProduit,
    deleteProduit,
    resetToDefault,
    defaultProduits,
  }
}
