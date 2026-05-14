import React from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import "../styles/WhatsappButton.css";

function WhatsappButton() {
  // ✅ Link generado en wa.link (ya incluye el mensaje inicial con opciones)
  const whatsappLink = "https://wa.link/lpqe40";

  const openWhatsapp = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="whatsapp-button">
      <button onClick={openWhatsapp} className="whatsapp-icon">
        <IconBrandWhatsapp size={32} color="#ffffff" />
      </button>
    </div>
  );
}

export default WhatsappButton;
