import { Grid } from "@nextui-org/react"
import { FC } from "react"
import { FavoriteCardPokemon } from "./FavoriteCardPokemon"

interface Props{
  pokemons: number[]
}

export const FavoritePokemons:FC<Props> = ({pokemons}) => {
  console.log(pokemons)
  return (
    <Grid.Container gap={2} direction="row" justify='flex-start'>
        {
        pokemons.map(id => (
          <FavoriteCardPokemon key={id} pokemon={id} />
        ))
        }
    </Grid.Container>
  )
}
