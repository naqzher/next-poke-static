import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';

import confetti from 'canvas-confetti';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts'
import { Pokemon, Welcome } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import { useState } from 'react';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage:NextPage<Props> = ({pokemon}) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if(isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,

      }
    })
    
  }

  

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid sm={4}>
          <Card isHoverable css={{padding: '30px'}}>
            <Card.Body>
              <Card.Image 
                src={pokemon.sprites?.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid sm={8}>
          <Card>
            <Card.Header css={{display:'flex', justifyContent: 'space-between'}}>            
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? "En favoritos" : "Guardar en favoritos" }
                
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display='flex' direction='row' gap={0}>
                <Image 
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const {data} = await pokeApi.get<Welcome>(`/pokemon?limit=151`);

  const pokemons151 = [...Array(151)].map((value, index) => `${data.results[index].name}`);
  
  return {
    paths: pokemons151.map(name => ({
      params: {name}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const {name} = ctx.params as {name: string};  

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}


export default PokemonByNamePage