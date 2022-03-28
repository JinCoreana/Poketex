import React from 'react'
import styled from '@emotion/styled/macro'
import { Color, Type } from '../Types';
import { mapColorToHex, mapTypeToHex } from '../utils';

const Base = styled.div<{ color?: string }>`
display:flex;
flex-direction: column;
background: ${({ color }) => color};
padding: 20px;
border-bottom-left-radius: 20%;
border-bottom-right-radius: 20%;`;
const ThumbnailImageWrapper = styled.div`
width: 160px;
margin-inline: auto;
margin-block: 24px;
`;
const ThumbnailImage = styled.img`
width: 100%;
height: 100%auto;
object-fit: contain;`;

const InfoWrapper = styled.div`
display: flex;
justify-content: space-between;
width: 100%;`;

const Name = styled.div`
color: #fff;
font-size: 30px;
font-weight: bold;
text-transform: capitalize;`;

const Index = styled.div`
color: #fff;
font-size: 36px;
font-weight: bold;
opacity: 0.75;`;

const TypeWrapper = styled.div<{ color?: string }>`
background-color: ${({ color }) => color};
padding: 4px;
border-radius: 50%;
display:flex;
justify-content: center;
align-items:center;`
    ;
const TypeList = styled.div`
display: flex;
margin-top: 8px;
${TypeWrapper} +${TypeWrapper} {
    margin-left: 8px;
};`;
const TypeInfo = styled.div< { src: string } >`
height: 12px;
`;
const ImageWrapper = styled.div`
position: absolute;
width: 288px;
height: 288px;
left: -94px;
opacity: 0.75;
`;
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: contain;`;

interface Props {
    id: string;
    name?: string;
    types: Array<Type>;
    color?: Color;
    src: () => void
}

const formatNumbering = (index: string): string => {
    return `#${index.padStart(3, '0')}`
}

const PokemonInfo: React.FC<Props> = ({ id, name, types, color }) => {
    return (
        <Base color={mapColorToHex(color?.name)}>
            <ImageWrapper>
                <Image src="/assets/poketball.svg" />
            </ImageWrapper>
            <InfoWrapper>
                <Name>{name}</Name>
                <Index>{formatNumbering(id)}</Index>
            </InfoWrapper>
            <TypeList>
                {types?.map(({ type }, idx) => (
                    <TypeWrapper key={idx} color={mapTypeToHex(type.name)}>
                        <TypeInfo src={`/assets/${type.name}.svg`} />
                    </TypeWrapper>
                ))}
            </TypeList>

            <ThumbnailImageWrapper>
                <ThumbnailImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} alt="image" />
            </ThumbnailImageWrapper>
        </Base>
    )
}

export default PokemonInfo;