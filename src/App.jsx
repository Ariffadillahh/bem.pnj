import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/page";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/auth/SignIn";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/User";
import StudentLinks from "./pages/admin/StudentLinks";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Posts from "./pages/admin/Posts";
import PostForm from "./pages/admin/PostForm";
import PostPage from "./pages/Post/PostPage";
import PostDetailPage from "./pages/Post/PostDetailPage";
import StudentLinkPage from "./pages/StudentLinks/StudentLinkPage";
import ScrollToTop from "./components/ScrollToTop";
import LayoutsOrganitation from "./pages/StrukturOrganisasi/LayoutsOrganitation";
import ProfileKabinet from "./pages/StrukturOrganisasi/pages/ProfileKabinet";
import Kemas from "./pages/StrukturOrganisasi/pages/Kemahasiswaan/Kemas";
import KetumWaketum from "./pages/StrukturOrganisasi/pages/Ketum&Wakil/KetumWaketum";
import Bpi from "./pages/StrukturOrganisasi/pages/BPI/Bpi";
import Bendum from "./pages/StrukturOrganisasi/pages/Bendum/Bendum";
import Bpp from "./pages/StrukturOrganisasi/pages/BPP/Bpp";
import Sekertaris from "./pages/StrukturOrganisasi/pages/Sekertaris/Sekertaris";
import Rkm from "./pages/StrukturOrganisasi/pages/RKM/Rkm";
import Kominfo from "./pages/StrukturOrganisasi/pages/Kominfo/Kominfo";
import PrestasiPage from "./pages/Prestasi/PrestasiPage";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/student-links" element={<StudentLinkPage />} />
        <Route path="/prestasi" element={<PrestasiPage />} />
        <Route path="/posts/:slug" element={<PostDetailPage />} />
        <Route path="/auth/sign-in" element={<SignIn />} />

        <Route path="/struktur-organisasi" element={<LayoutsOrganitation />}>
          <Route index element={<ProfileKabinet />} />
          <Route path="pimpinan" element={<KetumWaketum />} />
          <Route path="bpi" element={<Bpi />} />
          <Route path="bbu" element={<Bendum />} />
          <Route path="bsu" element={<Sekertaris />} />
          <Route path="bpp" element={<Bpp />} />
          <Route path="bk" element={<Kemas />} />
          <Route path="brkm" element={<Rkm />} />
          <Route path="kominfo" element={<Kominfo />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["superAdmin"]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="student-links"
            element={
              <ProtectedRoute>
                <StudentLinks />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/create"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/edit/:id"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
