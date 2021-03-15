import { useState } from 'react';
import { getAllCharacters } from '../services/characters';
import { CardContainer, Container, Input } from '../styles/pages/home';

function Home({ characters }) {
  const [charactersList, setCharactersList] = useState(characters);
  const [inputText, setInputText] = useState('');
  const [inputWithError, setInputWithError] = useState(false);

  const findCharacters = async () => {
    try {
      const { data } = await getAllCharacters({ characterName: inputText });

      setCharactersList(data);
    } catch (error) {
      alert('Error to find characters');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputText.length < 3) {
      setInputWithError(true);
      return;
    }

    findCharacters();
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Input
          inputWithError={inputWithError}
          type="text"
          placeholder="Search for a character"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setInputWithError(false);
          }}
        />
      </form>
      <ul>
        {charactersList?.map((character) => (
          <CharacterCard key={character.char_id} character={character} />
        ))}
      </ul>
    </Container>
  );
}

function CharacterCard({ character }) {
  return (
    <CardContainer>
      <img alt={character.name} src={character.img} width="100%" height="70%" />
      <div>
        <h2>{character.name}</h2>
        {character.nickname && <h2>{`"${character.nickname}"`}</h2>}
      </div>
    </CardContainer>
  );
}

export const getStaticProps = async () => {
  const { data } = await getAllCharacters();

  return {
    props: {
      characters: data,
    },
    revalidate: 15,
  };
};

export default Home;
