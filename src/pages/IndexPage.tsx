import React from "react";
import PokemonList from "../components/PokemonList";
import styled from '@emotion/styled/macro'

const Base = styled.div`
padding: 12px 18px;
overflow: hidden; `
const Title = styled.h1`
margin: 0;
margin-top: 15px;
padding: 0;
color: #d34f49;
font-weight: bold;`
const Description = styled.small`
color: #6b7288;
padding: 0;
margin: 16px 0 0 0;
display: block;`;
const ImageWrapper = styled.div`
position: fixed;
width: 288px;
height: 288px;
top: 0;
right: 0;
opacity: 0.4;
transform: translate(96px,-96px);`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: contain;`;

const IndexPage: React.FC = () => {
    return (
        <Base>
            <Title>Poketex</Title>
            <Description>Find your Pokemon!</Description>
            <PokemonList />
            <ImageWrapper>
                <Image src="assets/pocketball.svg" />
            </ImageWrapper>
        </Base>
    )
}

export default IndexPage;