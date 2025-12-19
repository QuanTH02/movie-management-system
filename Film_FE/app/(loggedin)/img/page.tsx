"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import { useGetMovieImages } from "@/app/lib/api/hooks";

function ImageGalleryContent() {
  const searchParams = useSearchParams();
  const [movieName, setMovieName] = useState<string | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
      const movie = searchParams.get("movie");
      if (movie) {
        setMovieName(decodeURIComponent(movie));
      }
    }
  }, [searchParams]);

  const { data: images, isLoading } = useGetMovieImages(movieName);

  if (!movieName) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-dark-text text-2xl font-bold mb-2">
                Movie name required
              </h2>
              <p className="text-dark-text-secondary mb-4">
                Please provide a movie name in the URL.
              </p>
              <Link
                href="/"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
              >
                ← Back to Home
              </Link>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">Loading images...</p>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div className="bg-dark-bg pt-20 pb-16">
        <Container>
          <div className="mb-6">
            <Link
              href={`/detail?movie=${encodeURIComponent(movieName)}`}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
            >
              ← Back to Movie
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-dark-text mb-8">
            Image Gallery: {movieName}
          </h1>

          {images && images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.link_img_id}
                  className="relative group cursor-pointer overflow-hidden rounded-card bg-dark-surface"
                  onClick={() => setSelectedImage(image.link_img)}
                >
                  <div className="aspect-[2/3] relative">
                    <img
                      src={image.link_img}
                      alt={`${movieName} - Image ${image.link_img_id}`}
                      className="w-full h-full object-cover transition-transform duration-hover group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark-bg/0 group-hover:bg-dark-bg/20 transition-colors duration-hover flex items-center justify-center">
                      <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100 transition-opacity duration-hover text-2xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                No images available for this movie.
              </p>
            </div>
          )}
        </Container>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-dark-bg/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-dark-text hover:text-primary-600 transition-colors duration-hover text-2xl"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <i className="fas fa-times" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function ImageGalleryPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar currentAccount={null} />
          <div className="bg-dark-bg pt-20 pb-16">
            <Container>
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
                <p className="mt-4 text-dark-text-secondary">Loading...</p>
              </div>
            </Container>
          </div>
        </>
      }
    >
      <ImageGalleryContent />
    </Suspense>
  );
}

export default ImageGalleryPage;
