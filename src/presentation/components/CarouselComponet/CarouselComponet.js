import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Carousel.css";
import translate from "translate";

const CarouselComponet = ({ slideItems }) => {
  translate.engine = "google";
  translate.key = process.env.DEEPL_KEY;

  const [items, setItems] = useState([]);
  const [animationClass, setAnimationClass] = useState("");
  const isAnimatingRef = useRef(false);

  // 🔹 Efecto para sincronizar slideItems y traducir descripciones
  useEffect(() => {
    const traducirItems = async () => {
      if (slideItems && slideItems.length > 0) {
        const traducidos = await Promise.all(
          slideItems.map(async (item) => {
            if (item?.synopsis) {
              try {
                let descTraducida = await translate(item.synopsis, "es");
                // 🔹 Eliminar "(...)" al final del texto
                descTraducida = descTraducida.replace(/\s*\([^)]*\)\s*$/, "");
                return { ...item, synopsis: descTraducida };
              } catch (err) {
                console.error("Error traduciendo:", err);
                return { ...item };
              }
            }
            return { ...item };
          })
        );
        setItems(traducidos);
      }
    };

    traducirItems();
  }, [slideItems]);

  // --- Movimiento del slider ---
  const moveSlider = useCallback(
    (direction) => {
      if (isAnimatingRef.current || items.length <= 1) return;
      isAnimatingRef.current = true;

      if (direction === "next") {
        setItems((prev) => {
          const newItems = [...prev];
          newItems.push(newItems.shift());
          return newItems;
        });
      } else {
        setItems((prev) => {
          const newItems = [...prev];
          newItems.unshift(newItems.pop());
          return newItems;
        });
      }

      setTimeout(() => setAnimationClass(direction), 10);

      setTimeout(() => {
        setAnimationClass("");
        isAnimatingRef.current = false;
      }, 600);
    },
    [items]
  );

  // --- Intervalo automático ---
  useEffect(() => {
    if (items.length > 1) {
      const intervalId = setInterval(() => {
        moveSlider("next");
      }, 14000);
      return () => clearInterval(intervalId);
    }
  }, [moveSlider, items]);

  if (!items || items.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`slider ${animationClass}`}>
      <div className="list">
        {items.map((item, index) => (
          <div className="item" key={item?.title + index}>
            <img src={item?.cover} alt={item?.title} />
            <div className="content">
              <div className="title">{item?.title}</div>
              <div className="type">{item?.type}</div>
              {/* 🔹 Ahora sí mostramos la descripción traducida */}
              <div className="description">
                {item?.synopsis?.length > 500
                  ? item.synopsis.slice(0, 500) + " ..."
                  : item.synopsis}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail">
        {items.slice(1, 5).map((item, index) => (
          <div className="item" key={item?.title + index}>
            <img src={item?.poster} alt={item?.title} />
          </div>
        ))}
      </div>

      <div className="nextPrevArrows">
        <button className="prev" onClick={() => moveSlider("prev")}>
          {"<"}
        </button>
        <button className="next" onClick={() => moveSlider("next")}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CarouselComponet;
