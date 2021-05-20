import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/auth';

import { photoURL } from '../services';
import { getAllCharacters } from '../services/characters';
import { CardContainer, Container, Input } from '../styles/pages/home';

function Characters() {
  const [charactersList, setCharactersList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputWithError, setInputWithError] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const findCharacters = async () => {
    try {
      const { data } = await getAllCharacters({ name: inputText });

      setCharactersList(data.characters);
    } catch (error) {
      alert('Error to find characters');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputText === '') {
      findCharacters();
      return;
    }

    if (inputText.length < 3) {
      setInputWithError(true);
      return;
    }

    findCharacters();
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push('/login');
      return;
    }
    findCharacters();
  }, []);

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
          <CharacterCard key={character.id} character={character} />
        ))}
      </ul>
    </Container>
  );
}

function CharacterCard({ character }) {
  return (
    <CardContainer>
      {console.log(photoURL + character.photo)}
      <img
        alt={character.name}
        src={photoURL + character.photo}
        width="100%"
        height="70%"
      />
      <div>
        <h2>{character.name}</h2>
        {character.nickname && <h2>{`"${character.nickname}"`}</h2>}
      </div>
    </CardContainer>
  );
}

export default Characters;
