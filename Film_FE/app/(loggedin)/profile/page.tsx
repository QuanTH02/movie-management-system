"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import MovieCard from "@/app/components/common/MovieCard";
import {
  useGetAccount,
  useGetLikedMovies,
  useDeleteLikedMovie,
} from "@/app/lib/api/hooks";
import { useI18n, translate } from "@/app/lib/i18n";
import { useToast } from "@/app/components/common/Toast";
import type { Movie } from "@/types/api.types";

function ProfilePage() {
  const router = useRouter();
  const { t } = useI18n();
  const toast = useToast();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  const { data: accountData, isLoading: isLoadingAccount } =
    useGetAccount(currentAccount);
  const {
    data: likedMovies,
    isLoading: isLoadingLiked,
    mutate: refetchLiked,
  } = useGetLikedMovies(currentAccount);
  const { trigger: deleteLikedTrigger, isMutating: isDeleting } =
    useDeleteLikedMovie({
      onSuccess: () => {
        refetchLiked();
        setShowDeleteConfirm(null);
        toast.success("Movie removed from favorites!");
      },
      onError: () => {
        toast.error("Failed to remove movie!");
      },
    });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const account = localStorage.getItem("currentAccount");
      if (!account) {
        router.push("/login");
        return;
      }
      setCurrentAccount(account);
    }
  }, [router]);

  useEffect(() => {
    if (
      accountData?.data &&
      Array.isArray(accountData.data) &&
      accountData.data.length > 0
    ) {
      const user = accountData.data[0];
      setProfileData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [accountData]);

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Implement update profile API call
    // For now, just show success message
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const handleDeleteMovie = (movieName: string) => {
    if (!currentAccount) return;
    deleteLikedTrigger({
      userName: currentAccount,
      movieName: movieName,
    });
  };

  if (isLoadingAccount) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                {t.profile.loadingProfile}
              </p>
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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-dark-text mb-8">
              {t.profile.profile}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-dark-text font-semibold mb-2">
                        {t.profile.username}
                      </label>
                      <Input
                        type="text"
                        value={currentAccount || ""}
                        disabled
                        className="bg-dark-surface"
                      />
                    </div>

                    <div>
                      <label className="block text-dark-text font-semibold mb-2">
                        {t.profile.firstName}
                      </label>
                      <Input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="block text-dark-text font-semibold mb-2">
                        {t.profile.lastName}
                      </label>
                      <Input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="block text-dark-text font-semibold mb-2">
                        {t.profile.email}
                      </label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      {isEditing ? (
                        <>
                          <Button
                            variant="primary"
                            onClick={handleSave}
                            disabled={isLoading}
                            fullWidth
                          >
                            {isLoading
                              ? t.profile.saving
                              : t.profile.saveChanges}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false);
                              // Reset to original data
                              if (
                                accountData?.data &&
                                Array.isArray(accountData.data) &&
                                accountData.data.length > 0
                              ) {
                                const user = accountData.data[0];
                                setProfileData({
                                  firstName: user.first_name || "",
                                  lastName: user.last_name || "",
                                  email: user.email || "",
                                });
                              }
                            }}
                            fullWidth
                          >
                            {t.profile.cancel}
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => setIsEditing(true)}
                          fullWidth
                        >
                          {t.profile.edit}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Favorite Movies */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-dark-text">
                      {t.profile.favoriteMovies}
                    </h2>
                    {likedMovies && likedMovies.length > 0 && (
                      <span className="text-dark-text-secondary">
                        {likedMovies.length} movie
                        {likedMovies.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {isLoadingLiked ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
                      <p className="mt-4 text-dark-text-secondary">
                        Loading favorite movies...
                      </p>
                    </div>
                  ) : likedMovies && likedMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                      {likedMovies.map((movie) => (
                        <div key={movie.movie_id} className="relative group">
                          <Link
                            href={`/detail?movie=${encodeURIComponent(movie.movie_name)}`}
                            className="block"
                          >
                            <div className="relative aspect-[2/3] rounded-card overflow-hidden bg-dark-surface mb-2">
                              {movie.main_img ? (
                                <img
                                  src={movie.main_img as string}
                                  alt={movie.movie_name}
                                  className="w-full h-full object-cover transition-transform duration-hover group-hover:scale-110"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-dark-card">
                                  <i className="fas fa-image text-4xl text-dark-text-secondary" />
                                </div>
                              )}
                              {/* Delete Button */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowDeleteConfirm(movie.movie_name);
                                }}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-dark-bg/90 hover:bg-error-DEFAULT flex items-center justify-center transition-colors duration-hover opacity-0 group-hover:opacity-100 z-10"
                                aria-label="Remove from favorites"
                              >
                                <i className="fas fa-times text-white text-sm" />
                              </button>
                              {/* Rating Badge */}
                              {movie.rating && (
                                <div className="absolute top-2 left-2 bg-dark-bg/80 backdrop-blur-sm px-2 py-1 rounded-badge flex items-center gap-1">
                                  <i className="fas fa-star text-rating-DEFAULT text-xs" />
                                  <span className="text-dark-text text-xs font-semibold">
                                    {String(movie.rating).includes("/")
                                      ? String(movie.rating).split("/")[0]
                                      : movie.movie_rating ||
                                        movie.rating ||
                                        "N/A"}
                                  </span>
                                </div>
                              )}
                            </div>
                            <h3 className="text-dark-text font-semibold text-sm line-clamp-2">
                              {movie.movie_name}
                            </h3>
                            {(movie.movie_year || movie.movie_time) && (
                              <p className="text-dark-text-secondary text-xs mt-1">
                                {movie.movie_year && (
                                  <span>{movie.movie_year}</span>
                                )}
                                {movie.movie_year && movie.movie_time && (
                                  <span className="mx-1">•</span>
                                )}
                                {movie.movie_time && (
                                  <span>{movie.movie_time}</span>
                                )}
                              </p>
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <i className="fas fa-heart text-6xl text-dark-text-secondary mb-4" />
                      <p className="text-dark-text-secondary text-lg mb-4">
                        {t.profile.noFavoriteMovies}
                      </p>
                      <Link href="/browse">
                        <Button variant="primary">
                          {t.browse.browseMovies}
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
          <Card className="p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-dark-text mb-4">
              {t.profile.removeFromFavorites}
            </h3>
            <p className="text-dark-text-secondary mb-6">
              {translate(t.profile.confirmRemove, {
                movieName: showDeleteConfirm,
              })}
            </p>
            <div className="flex gap-4">
              <Button
                variant="danger"
                onClick={() => handleDeleteMovie(showDeleteConfirm)}
                disabled={isDeleting}
                fullWidth
              >
                {isDeleting ? t.profile.removing : t.profile.yesRemove}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
                disabled={isDeleting}
                fullWidth
              >
                {t.profile.cancel}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
