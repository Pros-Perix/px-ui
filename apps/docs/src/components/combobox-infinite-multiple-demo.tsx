import { Avatar, Combobox, defineLoadOptions, InferOption } from "@px-ui/core";
import { useState } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
}

interface RickAndMortyCharactersApiResponse {
  info: {
    pages: number;
  };
  results: Character[];
}

const loadRickAndMortyCharacters = defineLoadOptions({
  cacheKey: ["character-options-multiple"],
  loader: async ({ search, page, signal }) => {
    const url = new URL("https://rickandmortyapi.com/api/character");
    url.searchParams.set("page", page.toString());
    search && url.searchParams.set("name", search);

    const res = await fetch(url, { signal });

    if (!res.ok) {
      if (res.status === 404) {
        return { data: { options: [], hasMore: false }, error: null };
      }
      return {
        data: { options: [], hasMore: false },
        error: "Cannot able to fetch characters",
      };
    }

    const data = (await res.json()) as RickAndMortyCharactersApiResponse;

    return {
      data: {
        options: data.results,
        hasMore: page < data.info.pages,
      },
      error: null,
    };
  },
});

export function ComboboxInfiniteMultipleDemo() {
  const [value, setValue] = useState<
    InferOption<typeof loadRickAndMortyCharacters>[]
  >([]);

  return (
    <Combobox.Root
      loadOptions={loadRickAndMortyCharacters}
      multiple
      value={value}
      onValueChange={setValue}
      isItemEqualToValue={(item, selected) => item?.id === selected?.id}
    >
      <Combobox.ChipsTrigger placeholder="Select characters">
        {(character: InferOption<typeof loadRickAndMortyCharacters>) => (
          <Combobox.Chip key={character.id}>
            <Avatar
              imgSrc={character.image}
              name={character.name}
              size="24px"
              variant="rounded"
            />
            {character.name}
          </Combobox.Chip>
        )}
      </Combobox.ChipsTrigger>
      <Combobox.Content>
        <Combobox.List>
          {(character: InferOption<typeof loadRickAndMortyCharacters>) => (
            <Combobox.MultiItem key={character.id} value={character}>
              <Avatar
                imgSrc={character.image}
                name={character.name}
                size="30px"
                variant="rounded"
              />
              <div className="flex flex-col">
                <span className="font-medium">{character.name}</span>
                <span className="text-ppx-muted-foreground text-xs">
                  {character.species}
                </span>
              </div>
            </Combobox.MultiItem>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
