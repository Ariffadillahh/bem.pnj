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
import StrukturOrganisasi from "./pages/StrukturOrganisasi/StrukturOrganisasi";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/student-links" element={<StudentLinkPage />} />
        <Route path="/posts/:slug" element={<PostDetailPage />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />

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
