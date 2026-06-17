"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Carroussel.module.css";

const slides = [
  {
    id: 1,
    imagem: "/adam-barclay-hUwwtSxWd_s-unsplash.jpg",
    classe: styles.bgSkate,
    tag: "NEW DROP",
    titulo: "PURE",
    subtitulo: "MOMENTUM",
  },
  {
    id: 2,
    imagem: "/lucas-kohoko-dNvY4ufMAwI-unsplash.jpg",
    classe: styles.bgSneaker,
    tag: "SS_2026",
    titulo: "STREET",
    subtitulo: "CULTURE",
  },
  {
    id: 3,
    imagem: "/photo-skate.jfif",
    classe: styles.bgSkate2,
    tag: "COLLAB",
    titulo: "NO",
    subtitulo: "LIMITS_",
  },
];

function Carroussel() {
  const [slideIndex, setSlideIndex] = useState(0);

  const anterior = () => {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const proximo = () => {
    setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(proximo, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[slideIndex];

  return (
    <div className={styles.hero}>
      <Image
        src={slide.imagem}
        alt={slide.titulo}
        fill
        priority
        className={`${styles.bg} ${slide.classe}`}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.tag}>{slide.tag}</span>
        <h1 className={styles.titulo}>
          {slide.titulo}
          <span className={styles.destaque}>{slide.subtitulo}</span>
        </h1>
        <div className={styles.btnGroup}>
          <button className={styles.btnFill}>EXPLORE_GEAR</button>
          <button className={styles.btnStroke}>WATCH_FILM</button>
        </div>
      </div>

      <button className={styles.navAnterior} onClick={anterior}>
        &#8249;
      </button>
      <button className={styles.navProximo} onClick={proximo}>
        &#8250;
      </button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === slideIndex ? styles.dotAtivo : styles.dot}
            onClick={() => setSlideIndex(i)}
          />
        ))}
      </div>

      <span className={styles.contador}>
        {String(slideIndex + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </span>
    </div>
  );
}

export default Carroussel;
