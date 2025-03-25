'use client'
import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Propos.css'; // Ensure the import path is correct

export default function AccordionExpandDefault() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div id='propos'>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="accordion-summary"
                >
                    <Typography component="span"><b>À propos de l’Hôpital Zagora-Future</b></Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    <Typography>
                        <i>Bienvenue à IMA</i><br/>
                        Fondé en 2030, l’Hôpital Zagora-Future est un établissement de santé de 
                        renommée internationale situé au cœur de ZAGORA. Grâce à nos
                        infrastructures modernes et notre équipe médicale hautement 
                        qualifiée, nous offrons des soins médicaux de pointe dans 
                        plusieurs spécialité<br/>
                        Notre mission est d’assurer des soins de qualité,
                        accessibles à tous, en combinant expertise médicale,
                        innovation technologique et approche humaine.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    className="accordion-summary"
                >
                    <Typography component="span"><b>Notre Mission et Nos Valeurs</b></Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    <Typography>
                        <i>Notre mission</i>
                        <br />
                        Nous nous engageons à fournir des soins médicaux d’excellence en mettant le patient au centre de nos préoccupations. Nous visons à :
                        ✔ Offrir des traitements de haute qualité adaptés aux besoins de chaque patient
                        <br />
                        ✔ Promouvoir la recherche et l’innovation médicale
                        <br />
                        ✔ Former les professionnels de santé de demain
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    className="accordion-summary"
                >
                    <Typography component="span"><b>Nos valeurs</b></Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    <Typography>
                        ✅ Excellence – Garantir des soins basés sur les meilleures pratiques médicales
                        <br />
                        ✅ Innovation – Utiliser les dernières avancées technologiques pour améliorer les traitements
                        <br />
                        ✅ Humanité – Placer le bien-être du patient au cœur de notre approche
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                    className="accordion-summary"
                >
                    <Typography component="span"><b>Nos Spécialités Médicales</b></Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    <Typography>
                        Nous proposons une large gamme de services médicaux et chirurgicaux, notamment :
                        <br />
                        <u>Cardiologie</u> (traitement des maladies du cœur)
                        <br />
                        <u>Oncologie</u> (prise en charge du cancer)
                        <br />
                        <u>Neurologie</u> (soins des maladies du cerveau et du système nerveux)
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5-content"
                    id="panel5-header"
                    className="accordion-summary"
                >
                    <Typography component="span"><b>Technologies et Infrastructures</b></Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    <Typography>
                        Nous investissons continuellement dans l’innovation pour améliorer les soins prodigués à nos patients :
                        <br />
                        ✔ Bloc opératoire ultra-moderne équipé de la robotique médicale
                        <br />
                        ✔ Centre d’imagerie médicale avancée (IRM, scanner 3D)
                        <br />
                        ✔ Unités de soins intensifs équipées des dernières technologies
                        <br />
                        ✔ Laboratoire de recherche en génétique et thérapie cellulaire
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6-content"
                    id="panel6-header"
                    className="accordion-summary"
                >
                    <Typography component="span"><b>Nos Accréditations et Distinctions</b></Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    <Typography>
                        🏆 Classé parmi les 10 meilleurs hôpitaux d’Europe (2024)
                        <br />
                        🏆 Certification Haute Qualité en Soins Médicaux (HAS)
                        <br />
                        🏆...
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}