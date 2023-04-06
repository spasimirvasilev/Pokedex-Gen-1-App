import React, { ChangeEvent } from "react"
import { Container, Grid, InputAdornment, TextField, Typography, Box, Button, IconButton, Autocomplete, Checkbox } from "@mui/material"
import PokemonCard from "../components/PokemonCard"
import { Field, usePokemonContext, PokemonType } from "../components/Contexts/PokemonProvider"
import { Search, FavoriteBorder, Favorite, Close, CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material"
import PokemonTypeIcon from "../components/PokemonTypeIcon"
import { capitalize } from "../utils"

const Home: React.FC = () => {
  const {
    pokemon,
    favourites,
    addFavourite,
    removeFavourite,
    filters,
    addFilter,
    removeFilter,
  } = usePokemonContext()

  const [open, setOpen] = React.useState(false)

  const activeQuery = (filters.name || "")

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    addFilter(Field.name, event.target.value)
  }

  const handleToggleFavourites = () => {
    if (filters[Field.favourite]) {
      removeFilter(Field.favourite)
    } else {
      addFilter(Field.favourite, true)
    }
  }

  const handleTypeQueryChange = (value: PokemonType[]) => {
    if (!value.length) {
      removeFilter(Field.type)
    } else {
      addFilter(Field.type, value)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h1">What Pokemon <br/>are you looking for?</Typography>
      <Box
        sx={{
          display: "flex",
          pt: 4,
          pb: 2
        }}
      >
        <TextField
          id="pokemon-search"
          placeholder="Search Pokemon"
          variant="outlined"
          value={activeQuery}
          onChange={handleQueryChange}
          sx={{width: "100%"}}
          InputProps={{
            sx: { pr: 0 },
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={() => removeFilter(Field.name)}><Close /></IconButton>
            </InputAdornment>
          }}
        />

        <Autocomplete 
          multiple
          id="type-filter"
          options={Object.values(PokemonType)}
          onChange={(_event, value) => handleTypeQueryChange(value)}
          disableCloseOnSelect
          openOnFocus
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          renderTags={(value) => {
            return <p style={{
              position: "absolute",
              width: open ? "" : "70%",
              marginTop: 0,
              marginBottom: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              right: 60
            }}>{open ? value.length - 1 === 0 ? `${capitalize(value[0])}` : `${capitalize(value[0])}... + ${value.length - 1}` : value.map((type) => capitalize(type)).join(", ")}</p>
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <PokemonTypeIcon type={option} sx={{mr: 1}} />
              {capitalize(option)}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type"
              multiline={false}
            />
          )}
          sx={{
            width: "40%",
            ml: "2rem"
          }}
        />

        <Button
          startIcon={filters[Field.favourite]
            ? <Favorite />
            : <FavoriteBorder />
          }
          color={filters[Field.favourite] ? "primary" : "secondary"}
          sx={{
            flexShrink: 0,
            ml: "2rem"
          }}
          onClick={handleToggleFavourites}
        >
          My Favourites ({favourites.length})
        </Button>
      </Box>

      <Grid container spacing={2}>
        {pokemon.map((pokemon) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={pokemon.name}
          >
            <PokemonCard
              pokemon={pokemon}
              isFavourite={favourites.includes(pokemon.name)}
              onAddFavourite={() => addFavourite(pokemon)}
              onRemoveFavourite={() => removeFavourite(pokemon)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home