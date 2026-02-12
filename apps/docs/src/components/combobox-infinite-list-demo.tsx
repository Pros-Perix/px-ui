import { Combobox, defineLoadOptions, InferOption } from "@px-ui/core";
import { useState } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
}

interface RickAndMortyCharactersApiResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}

const loadRickAndMortyCharacters = defineLoadOptions({
  cacheKey: ["character-options"],
  loader: async ({ search, page, signal }) => {
    await new Promise((res) => setTimeout(res, 300));
    const url = new URL("https://rickandmortyapi.com/api/character");
    url.searchParams.set("page", page.toString());
    search && url.searchParams.set("name", search);

    const res = await fetch(url, {
      signal,
    });

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

export function ComboboxInfiniteListDemo() {
  const [value, setValue] = useState<InferOption<
    typeof loadRickAndMortyCharacters
  > | null>({
    id: 81,
    name: "Crocubot",
    species: "Animal",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/81.jpeg",
  });

  return (
    <Combobox.Root
      loadOptions={loadRickAndMortyCharacters}
      value={value}
      onValueChange={setValue}
      isItemEqualToValue={(item, selected) => item?.id === selected?.id}
      itemToStringLabel={(item) => item.name}
    >
      <Combobox.SearchableTrigger
        placeholder="Select an character"
        widthVariant="enforced"
      />
      <Combobox.Content>
        <Combobox.List>
          {(character: InferOption<typeof loadRickAndMortyCharacters>) => (
            <Combobox.Item key={character.id} value={character}>
              {character.name}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
