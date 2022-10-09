import { Card, Grid } from "@nextui-org/react"
import { FC } from "react"
import { useRouter } from 'next/router';

interface Props{
    pokemon:number
}

export const FavoriteCardPokemon:FC<Props> = ({pokemon}) => {
    const router = useRouter();
    const onFavoriteClicked = () => {        
        router.push(`/pokemon/${pokemon}`)
    }

  return (    
    <Grid xl={1} key={pokemon}>
        <Card isHoverable isPressable css={{padding:10}} onPress={onFavoriteClicked}>
            <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon}.svg`}
            width={'100%'}
            height={140}
            />
        </Card>
    </Grid>
  )
}
