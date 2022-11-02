import Image from "next/image";
import logoImg from "../assets/logo.svg";
import usersAvatarsExample from "../assets/users-avatars-example.png";
import appPreviewImg from "../assets/app-preview.png";
import checkIcon from "../assets/check.svg";
import { api } from "../lib/axios";
import { create } from "domain";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("pools", {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      alert(
        "Bolão criado com sucesso, seu código foi copiado para a área de transferência!"
      );

      setPoolTitle('');
    } catch (error) {
      console.log("DEU RUIM", error);
    }
  }

  return (
    <div className="max-w-6xl h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="logo NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2 ">
          <Image
            src={usersAvatarsExample}
            alt="Exemplo de Imagens de usuários"
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span>{" "}
            {userCount === 1
              ? " pessoa já está usando"
              : "pessoas já estão usando"}
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded uppercase font-bold text-gray-900 text-sm hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="text-gray-300 mt-4 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={checkIcon} alt="Icone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={checkIcon} alt="Icone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma previa da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
