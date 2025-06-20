"use client";
import BooksCarousel from "@/components/booksCarousel";
import InputField from "@/components/inputField";
import { useState, useEffect, useRef } from "react";
import useFetchBookData, { Livro } from "@/hooks/useFetchBookData";
import GridLayout from "@/components/booksGridLayout";
import Image from "next/image";

export default function Biblioteca() {
  const { data, loading, error, fetchData } = useFetchBookData();
  const [searchValue, setSearchValue] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const bookDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData("https://maoamiga.up.railway.app/get_in_general_book");
  }, []);

  const handleBookClick = (book: Livro) => {
    setSelectedBook(book);
  };

  useEffect(() => {
    if (selectedBook && bookDetailsRef.current) {
      bookDetailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedBook]);

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredBooks = data.filter((item) => {
    const titulo = normalize(item.livro.titulo ?? "");

    const sentimentos = normalize(
      (item.livro.sentimentos ?? [])
        .filter((s): s is string => typeof s === "string")
        .join(" ")
    );

    const matchesText = titulo.includes(normalize(searchValue));
    const matchesSentiment = selectedSentiment
      ? sentimentos.includes(normalize(selectedSentiment))
      : true;

    return matchesText && matchesSentiment;
  });

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl flex flex-col items-center mt-10">
        <InputField
          emotions={true}
          inputWidth="w-full"
          width="w-full"
          marginLeft=""
          marginTop=""
          placeholder="Pesquise um livro..."
          sendButton={false}
          value={searchValue}
          onChange={setSearchValue}
          selectedSentiment={selectedSentiment}
          onSelectSentiment={setSelectedSentiment}
        />

        {selectedSentiment && (
          <button
            onClick={() => setSelectedSentiment("")}
            className="mt-4 text-sm text-primary underline hover:text-blue-600 transition"
          >
            <div className="flex flex-row items-center gap-2 mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-eraser-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
              </svg>
              Limpar Sentimento
            </div>
          </button>
        )}
      </div>

      <div className="flex flex-col mt-16 mb-10 text-center max-w-2xl">
        <h2 className="text-3xl sm:text-4xl text-gray-600">Escolha um livro</h2>
        <p className="text-base sm:text-lg">
          Clique no livro para abrir a exibição, baixe ou busque um livro (por
          texto ou sentimento)...
        </p>
      </div>

      {loading && <p className="text-center mt-10">Carregando...</p>}
      {error && <p className="text-center mt-10 text-red-500">{error}</p>}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="flex justify-center my-6">
            <button
              onClick={() =>
                setViewMode(viewMode === "grid" ? "carousel" : "grid")
              }
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {viewMode === "grid" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-collection-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-grid-3x2-gap-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                </svg>
              )}
            </button>
          </div>

          {viewMode === "grid" ? (
            <div className="max-h-[800px] overflow-y-auto mx-auto w-full max-w-6xl mb-20">
              <GridLayout
                items={filteredBooks.map((item) => item.livro)}
                onBookClick={handleBookClick}
                downloadIcon
              />
            </div>
          ) : (
            <BooksCarousel
              items={filteredBooks.map((item) => item.livro)}
              onBookClick={handleBookClick}
              downloadIcon
            />
          )}

          {selectedBook && (
            <div
              ref={bookDetailsRef}
              className="flex justify-center mt-20 mb-20 flex-col items-center px-4"
            >
              <h3 className="text-2xl sm:text-3xl text-primary mb-4 max-w-md text-center">
                {selectedBook.titulo}
              </h3>
              {selectedBook.nome_autor && (
                <p className="text-base sm:text-lg text-gray-500 mb-2 italic">
                  Autor: {selectedBook.nome_autor}
                </p>
              )}
              {selectedBook.sentimentos && (
                <p className="text-gray-600 mb-4">
                  {selectedBook.sentimentos.join(", ")}
                </p>
              )}
              {selectedBook.imagem_capa && (
                <div className="w-full flex justify-center">
                  <Image
                    src={selectedBook.imagem_capa}
                    alt={`Capa do livro ${selectedBook.titulo}`}
                    width={400}
                    height={500}
                    className="object-contain rounded-lg shadow-md w-auto h-auto"
                  />
                </div>
              )}
              {selectedBook.descricao && (
                <p className="max-w-xl mt-10 mb-10 text-center">
                  {selectedBook.descricao}
                </p>
              )}
              {selectedBook.link_download && (
                <a
                  href={selectedBook.link_download}
                  target="_blank"
                  className="mb-4 text-primary hover:underline"
                >
                  Baixar PDF
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
