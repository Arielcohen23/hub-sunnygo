const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY

const BASES = {
  CEE:                { baseId: 'app2vNV8vhaVXaxm9', tableId: 'tbl5M8FlQZMTmTS1K' },
  Courtage:           { baseId: 'app2vNV8vhaVXaxm9', tableId: 'tbl5M8FlQZMTmTS1K' },
  PV:                 { baseId: 'appL05lW4JYws0G70', tableId: 'tbls4TMWKEugandz4' },
  TiersInvestissement:{ baseId: 'appL05lW4JYws0G70', tableId: 'tbls4TMWKEugandz4' },
}

export async function createApporteur({ nom, email, telephone, produitNom, categorie }) {
  const config = BASES[categorie] || BASES.CEE
  const url = `https://api.airtable.com/v0/${config.baseId}/${config.tableId}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        'Nom':              nom,
        'Email':            email,
        'Téléphone':        telephone,
        'Statut':           'Commerciaux Externe',
        'Statut équipe':    'En attente',
        'Produit souhaité': produitNom,
        'Source':           'Hub SunnyGo',
      },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Airtable error ${response.status}`)
  }

  return response.json()
}
