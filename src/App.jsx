import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Hub from './pages/Hub'
import CommentCaMarche from './pages/CommentCaMarche'
import ProduitDetail from './pages/ProduitDetail'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminProduits from './pages/admin/AdminProduits'
import AdminVedette from './pages/admin/AdminVedette'
import AdminDocuments from './pages/admin/AdminDocuments'
import AdminApparence from './pages/admin/AdminApparence'
import AdminParametres from './pages/admin/AdminParametres'
import PortailGuard from './components/auth/PortailGuard'

export default function App() {
  return (
    <BrowserRouter>
      <PortailGuard>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hub />} />
        <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
        <Route path="/produit/:id" element={<ProduitDetail />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/produits" replace />} />
          <Route path="produits" element={<AdminProduits />} />
          <Route path="produits/nouveau" element={<AdminProduits />} />
          <Route path="produits/:id" element={<AdminProduits />} />
          <Route path="vedette" element={<AdminVedette />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="apparence" element={<AdminApparence />} />
          <Route path="parametres" element={<AdminParametres />} />
        </Route>
      </Routes>
      </PortailGuard>
    </BrowserRouter>
  )
}
