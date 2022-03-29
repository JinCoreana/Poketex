
import React, { useMemo, useState } from "react";
import { useParams } from 'react-router-dom'
import About from "../components/About";
import Evolution from "../components/Evolution";
import PokemonInfo from "../components/PokemonInfo";
import Stats from "../components/Stats";
import Tabs from "../components/Tabs";
import usePokemon from "../hooks/usePokemon";
import useSpecies from "../hooks/useSpecies";
import { PokemonResponse } from "../types";
import styled from '@emotion/styled/macro'

type Params = {
    id: string;
}

type Tab = 'about' | 'stats' | 'evolution';



const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;


const DetailPage: React.FC = () => {
    const { id } = useParams<Params>();
    const [selectedTab, setSelectedTab] = useState<Tab>('about')
    const pokemonQueryResult = usePokemon<PokemonResponse>(id);
    const { name,
        base_experience,
        height,
        weight,
        stats,
        abilities,
        types } = useMemo(() => ({
            name: pokemonQueryResult.data?.data.name,
            order: pokemonQueryResult.data?.data.order,
            sprites: pokemonQueryResult.data?.data.sprites,
            base_experience: pokemonQueryResult.data?.data.base_experience,
            height: pokemonQueryResult.data?.data.height,
            weight: pokemonQueryResult.data?.data.weight,
            stats: pokemonQueryResult.data?.data.stats,
            abilities: pokemonQueryResult.data?.data.abilities,
            types: pokemonQueryResult.data?.data.types,
        }), [pokemonQueryResult])
    const speciesQueryResult = useSpecies(id);
    const {
        color,
        growthRate,
        flavorText,
        genderRate,
        isLegendary,
        isMythical,
        evolutionChainUrl, } = useMemo(() => ({
            color: speciesQueryResult.data?.data.color,
            growthRate: speciesQueryResult.data?.data.growth_rate.name,
            flavorText: speciesQueryResult.data?.data.flavor_text_entries[0].flavor_text,
            genderRate: speciesQueryResult.data?.data.gender_rate,
            isLegendary: speciesQueryResult.data?.data.is_legendary,
            isMythical: speciesQueryResult.data?.data.is_mythical,
            evolutionChainUrl: speciesQueryResult.data?.data.evolution_chain.url,
        }), [speciesQueryResult])
    const handleClick = (tab: Tab) => {
        setSelectedTab(tab);
    }
    return (
        <Container>
            <PokemonInfo id={id} name={name} types={types} color={color} />

            <TabsWrapper>
                <Tabs tab={selectedTab} onClick={handleClick} color={{ name: 'red', url: "" }} />
            </TabsWrapper>
            {
                selectedTab === 'about' && (
                    <About isLoading={pokemonQueryResult.isLoading || speciesQueryResult.isError}
                        color={color}
                        growthRate={growthRate}
                        flavorText={flavorText}
                        genderRate={genderRate}
                        isLegendary={isLegendary}
                        isMythical={isMythical}
                        types={types}
                        weight={weight}
                        height={height}
                        baseExp={base_experience}
                        abilities={abilities} />
                )
            }
            {
                selectedTab === 'stats' && (
                    <Stats isLoading={pokemonQueryResult.isLoading || speciesQueryResult.isError}
                        stats={stats}
                        color={color} />)
            }
            {
                selectedTab === 'evolution' && (
                    <Evolution isLoading={speciesQueryResult.isLoading}
                        id={id}
                        color={color}
                        url={evolutionChainUrl}
                    />
                )
            }
        </Container>)
}

export default DetailPage; 
