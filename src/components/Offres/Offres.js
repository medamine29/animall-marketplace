import React, { useState, useEffect } from "react";
import swal from 'sweetalert';
import { addOffre } from "../../api/userService";

import './Offres.css'

function Offres() {

    const [promotionText, setPromotionText] = useState("")

    const handleWriteOffre = (event) => {
        setPromotionText(event.target.value)
    }

    const handleAddOffre = async () => {
        const data = await addOffre(promotionText)

        if(data.status) swal("Succés", "L'offre a été ajouté avec succés !", "success");
        else swal("Erreur", data.message, "error");
    }

  return (
    <div className="offres">
        <input className="input-comment" type="text" name="comment" placeholder="ajouter une promotion" onChange={handleWriteOffre}/>
        <button className="btn-send" onClick={handleAddOffre}>Envoyer</button>
    </div>
  );
}

export default Offres;