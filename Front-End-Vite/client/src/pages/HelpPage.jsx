import React from "react";
import "../stylesheets/HelpPageStylesheets/HelpPage.css";
import EndUseNavbar from "../components/EndUseNavbar";
import { motion } from "framer-motion";
import BtnDropDown from "../components/BtnDropDown";

function HelpPage() {
  return (
    <>
      <div className="wrapper-hp">
        <EndUseNavbar grabarId="" análisisId="" ayudaId="ayuda" />
        <div className="texts-header">
          <motion.div
            className="text-header-content"
            initial={{
              opacity: 0,
              y: 75,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                type: "tween",
                ease: "easeOut",
                duration: 0.75,
              },
            }}
            viewport={{
              once: true,
            }}
          >
            <p>FAQs (Preguntas Frecuentes)</p>
            <h1>¿En qué podemos ayudarte?</h1>
          </motion.div>
        </div>
        <motion.div
          className="divider-hp"
          animate={{
            width: "80%",
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
        ></motion.div>
        <motion.section
          className="faqs"
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              type: "tween",
              ease: "easeOut",
              duration: 0.75,
            },
          }}
        >
          <div className="faqs-content">
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
            <BtnDropDown
              questionText={"¿Cómo colocar la cámara para mis análisis?"}
              answerText={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quibusdam harum totam aperiam voluptates similique, aliquid aliquam amet sunt accusamus repellat quo repudiandae blanditiis tempora dolores numquam ducimus? Maiores quam, rem, eveniet quasi minus, ducimus ab voluptates tempora fugit quia officia perferendis nam unde! Suscipit quod a magni impedit asperiores!"
              }
            />
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default HelpPage;
