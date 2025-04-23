import React, { useState } from "react";

function Page3() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const showVideo = (letter) => {
    setVideoSrc(`${process.env.PUBLIC_URL}/videos/${letter}.mp4`);
    setModalOpen(true);

    // Auto-close after 3 seconds
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  const closeModal = () => {
    setModalOpen(false);
    setVideoSrc("");
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #1c1c1c, #292e49)",
      overflow: "hidden",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(12px)",
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      width: "80%",
      maxWidth: "1200px",
      textAlign: "center",
      color: "white",
      height: "85vh",
      justifyContent: "center",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "1.5rem",
      opacity: 0.8,
      marginBottom: "20px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gap: "15px",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: "20px",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2rem",
      fontWeight: "bold",
      color: "white",
      height: "90px",
      width: "90px",
      borderRadius: "15px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1)",
      background: "linear-gradient(145deg, #20232a, #292e49)",
    },
    boxHover: {
      background: "linear-gradient(145deg, #2a2d41, #3a3f5c)",
      transform: "scale(1.1)",
      boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.4), -5px -5px 15px rgba(255, 255, 255, 0.2)",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "70vw", // Reduced width
      height: "60vh", // Reduced height
      background: "#000",
      borderRadius: "10px",
    },
    modalVideo: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      objectFit: "cover",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🔠 Alphabet Learning</h1>
        <p style={styles.subtitle}>Click a letter to see the video!</p>

        <div style={styles.grid}>
          {Array.from(alphabet).map((letter, index) => (
            <div
              key={index}
              style={styles.box}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.boxHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.box)}
              onClick={() => showVideo(letter)}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Modal for Video */}
        {isModalOpen && (
          <div style={styles.modalOverlay} onClick={closeModal}>
            <div style={styles.modalContent}>
              <video controls autoPlay style={styles.modalVideo}>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page3;
