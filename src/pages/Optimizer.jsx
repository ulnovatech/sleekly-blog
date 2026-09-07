// src/pages/Optimizer.jsx
import { useState } from "react";
import ArticleList from "../components/optimizer/ArticleList";
import Engine from "../components/optimizer/Engine";
import LogConsole from "../components/optimizer/LogConsole";
import { Box, Paper, Typography, Alert } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../site.config";
import InfoIcon from "@mui/icons-material/Info";

export default function Optimizer() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [logs, setLogs] = useState([]);

  const handleLog = (msg, type = "info") => {
    setLogs((prev) => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);
  };

  return (
    <>
      <Helmet>
        <title>Image Optimizer — {siteConfig.blogName}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Optimize images for your blog articles." />
      </Helmet>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#212121",
            mb: 2,
          }}
        >
          Image Optimizer
        </Typography>
        <Alert icon={<InfoIcon />} severity="info">
          Select an article from the list to manage and optimize its images for better
          performance and web compatibility.
        </Alert>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "250px 1fr", md: "250px 1fr 300px" },
          gap: 2,
          bgcolor: "#f5f5f5",
          borderRadius: "12px",
          overflow: "hidden",
          minHeight: "calc(100vh - 400px)",
        }}
      >
        {/* Left: Articles list */}
        <Paper
          sx={{
            borderRadius: "0",
            overflowY: "auto",
            bgcolor: "white",
            boxShadow: "inset 1px 0 0 #e0e0e0",
          }}
          elevation={0}
        >
          <ArticleList onSelect={setActiveArticle} />
        </Paper>

        {/* Middle: Engine */}
        <Paper
          sx={{
            borderRadius: "0",
            p: 2,
            overflowY: "auto",
            bgcolor: "white",
          }}
          elevation={0}
        >
          {activeArticle ? (
            <>
              <Paper sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5" }} elevation={0}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {activeArticle.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {activeArticle.slug}
                </Typography>
              </Paper>
              <Engine article={activeArticle} onLog={handleLog} />
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                minHeight: "400px",
              }}
            >
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
                Select an article to manage images
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Right: Logs */}
        <Paper
          sx={{
            borderRadius: "0",
            p: 2,
            overflowY: "auto",
            bgcolor: "#f5f5f5",
            boxShadow: "inset -1px 0 0 #e0e0e0",
            display: { xs: "none", md: "block" },
          }}
          elevation={0}
        >
          <LogConsole logs={logs} />
        </Paper>
      </Box>
    </>
  );
}



// // src/pages/Optimizer.jsx
// import { useEffect, useState } from "react";
// import ArticleSelector from "../components/optimizer/ArticleSelector";
// import ImageGrid from "../components/optimizer/ImageGrid";
// import FileTree from "../components/optimizer/FileTree";
// import LogConsole from "../components/optimizer/LogConsole";

// import SettingsPanel from "../components/optimizer/SettingsPanel";
// import { fetchArticles, optimizeArticle, optimizeAll } from "../utils/optimizerApi";

// export default function OptimizerPage() {
//   const [articles, setArticles] = useState([]);
//   const [active, setActive] = useState(null);
//   const [images, setImages] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [tree, setTree] = useState([]);
//   const [running, setRunning] = useState(false);
//   const [settings, setSettings] = useState({
//     sizes: [400, 800, 1200],
//     formats: ["webp", "avif", "jpg"],
//     quality: 80,
//     coverCrop: true,
//     autoOptimizeOnSelect: false,
//   });

//   useEffect(() => {
//     async function load() {
//       const list = await fetchArticles();
//       setArticles(list || []);
//       if (list && list.length) setActive(list[0].slug);
//     }
//     load();
//   }, []);

//   useEffect(() => {
//     const article = articles.find(a => a.slug === active);
//     setImages(article?.images || []);
//   }, [active, articles]);

//   async function handleOptimize() {
//     if (!active) return;
//     setRunning(true);
//     setLogs([]);
//     setTree([]);
//     try {
//       const res = await optimizeArticle(active, settings);
//       if (res?.messages) setLogs(prev => [...prev, ...res.messages]);
//       if (res?.tree) setTree(res.tree);
//     } catch (err) {
//       setLogs(prev => [...prev, `Error: ${err.message || err}`]);
//     } finally {
//       setRunning(false);
//     }
//   }

//   async function handleOptimizeAll() {
//     setRunning(true);
//     setLogs([]);
//     setTree([]);
//     try {
//       const res = await optimizeAll(settings);
//       setLogs(prev => [...prev, ...(res?.messages || [])]);
//       setTree(res?.tree || []);
//     } catch (err) {
//       setLogs(prev => [...prev, `Error: ${err.message || err}`]);
//     } finally {
//       setRunning(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-semibold">Image Optimizer</h1>
//           <div className="flex gap-3">
//             <button
//               onClick={handleOptimizeAll}
//               disabled={running}
//               className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
//             >
//               Optimize All
//             </button>
//             <button
//               onClick={handleOptimize}
//               disabled={running || !active}
//               className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
//             >
//               Optimize Selected
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-12 gap-6">
//           <div className="col-span-3 bg-white rounded shadow p-4">
//             <ArticleSelector
//               articles={articles}
//               active={active}
//               onSelect={setActive}
//               running={running}
//             />
//             <div className="mt-4">
//               <SettingsPanel settings={settings} onChange={setSettings} />
//             </div>
//           </div>

//           <div className="col-span-6 bg-white rounded shadow p-4">
//             <h2 className="text-lg font-medium mb-3">Images (cover & inline)</h2>
//             <ImageGrid images={images} />
//           </div>

//           <div className="col-span-3 bg-white rounded shadow p-4">
//             <h2 className="text-lg font-medium mb-3">Output / Logs</h2>
//             <FileTree tree={tree} />
//             <div className="mt-4">
//               <LogConsole logs={logs} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
