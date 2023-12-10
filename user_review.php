<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Movie Website</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="templates/home.css">


    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="js/home.js"></script>
    <script src="js/review.js"></script>
    <style>
        /* Add your custom styles here */

        /* Fix for the container */
        body {
            padding-top: 65px;
            /* Adjust based on your navbar height */
        }
    </style>
</head>

<body>
    <!-- Navbar -->
    <?php
    include 'nav.php';
    ?>

    <div class="div-container" style="width: 60%;">
        <div class="bg-user-reviews">
            <div class="user-reviews-intro p-3">
                <img src="img/vebinh1.jpg" alt="" class="d-inline-block mb-5" style="width: 72px; height: 102px;">
                <div class="d-inline-block ml-3 mb-4" style="vertical-align: middle;">
                    <a href="detail.php" style="color: rgb(92, 0, 252);">
                        <h5>Ve binh giai ngan ha</h5>
                    </a>
                    <h3>User Reviews</h3>

                </div>
                <a href="#" class="mt-2 mr-4 link-to-review open-popup" style="float: right; align-items: center;">
                    <p class="mb-0 p-1" style="color: rgb(92, 0, 252);;"><i class="fa-solid fa-plus"
                            style="color: rgb(92, 0, 252);;"></i> Review</p>
                </a>
                <hr class="mt-0">
                <div class="user-reviews-total-review-and-filter">
                    <div class="total-reviews d-inline-block" style="color: yellow;">
                        <p class="d-inline-block ml-2">Total:</p>
                        <p class="total-review d-inline-block">30</p>
                        <p class="d-inline-block">Reviews</p>
                    </div>
                    <div class="filter-reviews d-inline-block float-right">
                        <div class="d-inline-block">Filter by Rating:</div>
                        <select name="ratingFilter" class="d-inline-block">
                            <option value="0" selected="selected">Show all</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                            <option value="6">6 Stars</option>
                            <option value="7">7 Stars</option>
                            <option value="8">8 Stars</option>
                            <option value="9">9 Stars</option>
                            <option value="10">10 Stars</option>
                        </select>
                    </div>
                </div>

                <hr class="mt-0">
                <div class="user-reviews">
                    <!-- Review Element -->
                    <div class="review-element p-3 mb-2">
                        <!-- Rate -->
                        <div class="review-rate">
                            <i class="fas fa-star pr-1"
                                style="color: yellow; display: inline-block; font-size: 18px;"></i>
                            <div class="d-inline-block">
                                <p class="d-inline-block vote-rate">8</p>
                                <p class="d-inline-block">/10</p>
                            </div>
                        </div>

                        <!-- Title review -->
                        <div class="title-review">
                            <h6>Gareth Edwards gives a visually interesting, unique, and timely take on the well worn
                                field of A.I. which is really strong even if I'm not a fan of its fatalistic ending</h6>
                            <a href="#" class="d-inline-block">
                                <p class="name-review">IonicBreezeMachine</p>
                            </a>
                            <p class="date-review d-inline-block">30 September 2023</p>
                            <div class="review-content">
                                <p>The Creator is an all too rare piece of original epic sci-fi that's built on very
                                    familiar foundations and uses them to create something that's as visually exciting
                                    as it is emotionally investing, completely unafraid to show American military might
                                    for the soulless monster it is.

                                    John David Washington plays his reluctant father figure in terrific fashion, closed
                                    off at first but those barriers are all successfully worn down by the end. In her
                                    screen debut Madeleine Yuna Voyles is amazing, adorable and undoubtedly the main
                                    reason any of this works on an emotional level.

                                    Supporting them is Ken Watanabe being as effortlessly stoic as always and Allison
                                    Janney as an antagonist with a solid amount of depth all thanks to just one scene
                                    which efficiently explains her viewpoint in a believable fashion but she's also just
                                    plain ruthless in her relentless pursuit.

                                    Gareth Edwards once again proves he doesn't need established franchises to create
                                    epic imagery or fascinating worlds on a blockbuster scale. Between the stunning
                                    cinematography by Greig Fraser & Oren Soffer and the ridiculously impressive CG it
                                    outdoes the majority of the competition on a fraction of the cost.

                                    Uncharacteristically for Gareth Edwards there's a fair few needle drops early on,
                                    the choices can be obvious but always effective and the music by Hans Zimmer is
                                    solid. It's mostly just fine up until the third act where it really comes to life
                                    and avoids feeling wasted.</p>

                                <div class="review">
                                    <i class="fa-regular fa-thumbs-up d-inline-block"
                                        style="font-size: 20px; width: 100px;">
                                        <p class="d-inline-block pl-2 pr-4 like-count" style="font-size: 14px;">
                                            200</p>
                                    </i>
                                    <i class="fa-regular fa-thumbs-down d-inline-block"
                                        style="font-size: 20px; width: 100px;">
                                        <p class="d-inline-block pl-2 pr-4 dislike-count" style="font-size: 14px;">20
                                        </p>
                                    </i>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Review Element -->
                    <div class="review-element p-3 mb-2">
                        <!-- Rate -->
                        <div class="review-rate">
                            <i class="fas fa-star pr-1"
                                style="color: yellow; display: inline-block; font-size: 18px;"></i>
                            <div class="d-inline-block">
                                <p class="d-inline-block vote-rate">9</p>
                                <p class="d-inline-block">/10</p>
                            </div>
                        </div>

                        <!-- Title review -->
                        <div class="title-review">
                            <h6>Great visuals and acting, but not so subliminal messaging</h6>
                            <a href="#" class="d-inline-block">
                                <p class="name-review">Imshortok06</p>
                            </a>
                            <p class="date-review d-inline-block">30 September 2023</p>
                            <div class="review-content">
                                <p>You know a movie is bad when you take your Asian immigrant dad to go watch it with
                                    you and the first thing he says after watching it is "Okay, which communist wrote
                                    this?!" The movie's message seemed to be America: bad; military: bad; Asia: good.
                                    And there didn't seem to be any compelling reason to root for the robots other than
                                    the fact that the kid was cute and the other AI were poor villagers. It seems to me
                                    that in order for a movie to be good, the message should be complex and universally
                                    compelling. I didn't get what the message was, other than what I previously stated.
                                    Literally every bad guy was white and American. It's either very biased or very
                                    patronizing. On the other hand, I did think the actors did a good job, and the
                                    cinematography was outstanding.
                                    74 out of 107 found this helpful. Was this review helpful? Sign in to vote.
                                    Permalink</p>

                                <div class="review">
                                    <i class="fa-regular fa-thumbs-up d-inline-block"
                                        style="font-size: 20px; width: 100px;">
                                        <p class="d-inline-block pl-2 pr-4 like-count" style="font-size: 14px;">
                                            300</p>
                                    </i>
                                    <i class="fa-regular fa-thumbs-down d-inline-block"
                                        style="font-size: 20px; width: 100px;">
                                        <p class="d-inline-block pl-2 pr-4 dislike-count" style="font-size: 14px;">15
                                        </p>
                                    </i>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Review Element -->
                    <div class="review-element p-3 mb-2">
                        <!-- Rate -->
                        <div class="review-rate">
                            <i class="fas fa-star pr-1"
                                style="color: yellow; display: inline-block; font-size: 18px;"></i>
                            <div class="d-inline-block">
                                <p class="d-inline-block vote-rate">10</p>
                                <p class="d-inline-block">/10</p>
                            </div>
                        </div>

                        <!-- Title review -->
                        <div class="title-review">
                            <h6>Gareth Edwards gives a visually interesting, unique, and timely take on the well worn
                                field of A.I. which is really strong even if I'm not a fan of its fatalistic ending</h6>
                            <a href="#" class="d-inline-block">
                                <p class="name-review">jon_hsieh</p>
                            </a>
                            <p class="date-review d-inline-block">1 October 2023</p>
                            <div class="review-content">
                                <p>Before, I was curious if the movie would delve into thought-provoking internal
                                    dilemmas, whether the story would be good or not, if it would be an indie sci-fi or
                                    a grand, epic spectacle... because the trailers already teased at impressive visuals
                                    as a given, so I hoped that the rest of the movie would live up to them. Ideally,
                                    it's better to get into the movie without watching trailers, but I couldn't avoid
                                    them, the cinema had been playing the Creator trailers as previews for other movies
                                    for a while.

                                    I wasn't getting myself too excited for this because it could've easily been a
                                    cliche and unimaginative, but it wasn't and still had an original feel to it. The
                                    short background was nice, especially since the human vs. AI theme has been explored
                                    before. It was good that the movie didn't dwell on developing plot points that
                                    didn't bring anything new to the table. The world-building was well done and gave
                                    the film a sense of familiarity.

                                    I thought this was gonna be an indie sci-fi flick, but the sheer vastness and visual
                                    splendor put away any concern of the "small" budget it had being restrictive. It's
                                    remarkable, especially when you compare it to many other big-budget TV shows and
                                    movies that don't achieve this level of visual excellence. The explosions were cool
                                    and plenty; while still not being overdone. Visually, everything was executed
                                    perfectly; it was a true spectacle. I liked the slightly grainy texture it had,
                                    instead of the smooth shiny CGI feel like that seen in MCU films.

                                    I liked the storytelling approach of breaking the movie into chapters. It gave the
                                    movie a sci-fi narrative or dramatic feel rather than being purely action-packed,
                                    although there was plenty of action as well. As I mentioned earlier, there were a
                                    lot explosions, but they were handled sensibly and maturely, yet still managed to
                                    bring that childlike excitement in me that likes seeing things go boom.

                                    It was funny in a subtle way, they weren't trying to sneak them in and it's not
                                    getting big belly laughs. The pacing was good, and overall, it was was just a
                                    well-crafted film. The world-building was gradual, allowing you to learn about this
                                    world as the movie unfolded, rather than through an upfront introduction to it all.
                                    This world was well crafted, showed depth and thoughtful design.

                                    Why would a war vet have an alarm clock that triggers his ptsd???? That was the one
                                    unintentionally funny scene, literally burst out laughing at that. Anyway, Sound
                                    track music score was great, different from what I usually remember Hans zimmer for,
                                    but I should say I don't have a keen ear for that sorta stuff. I was only paying
                                    attention because I knew it was zimmer.

                                    It somewhat felt like a breath of fresh air, of course the human vs AI trope isn't
                                    new, but this was done right and didn't feel like a repeat or rip-off. It's a sci-fi
                                    film with heart and genuine emotions. As far as the plot, it reminded me of Hugh
                                    Jackman's solo Wolverine film, Logan. And the cast did well too, a very decent cast
                                    who put in wonderful performances, from both antagonists and protagonists sides.
                                    Standout was Madeleine Yuna Voyles, who portrayed the character Alphie exceptionally
                                    well. I was also impressed by Allison Janney's believably ruthless portrayal;
                                    Washington and Ken Watanabe once again showed their acting prowess.

                                    The plot and its twists and turns weren't mind-bending, there were several moments
                                    where you could piece things together before the movie officially unveiled them or
                                    before the characters caught on. But, I consciously tried to avoid predicting where
                                    it was heading. The final act was a pleasant surprise, at one point in the movie, I
                                    thought it was reaching its end, but that it was just the beginning of the final
                                    stretch. So for me, it felt like a bonus lol.

                                    I was curious as the movie went on if it was going to end a full story arc, or
                                    simply just a set up more sequels. I loved that it felt like a natural ending to the
                                    story while also leaving the door open for potential sequels. The ending seemed
                                    inevitable but I wish it was different, but as I said it felt natural so mixed
                                    feelings. The pacing was impressive, and the plot was lean, without any unnecessary
                                    stuff. Despite its simplicity, pretty significant events unfolded throughout the
                                    movie, keeping the narrative interesting.

                                    This movie is emotionally evocative; beyond sci-fi, it carries the weight of a war
                                    drama, which naturally comes with emotional impact. The storytelling is told in a
                                    way that tugs at your heartstrings, particularly sympathizing with the AI robot
                                    side, but when it comes to the "bad guys," the Americans, you can understand their
                                    logic but don't necessarily side with them. The American military personnel are
                                    portrayed as very typical, following the textbook design. They view the other side
                                    not as people but as enemies, which makes them ruthless and seemingly heartless in
                                    their pursuit, all in service to their country bla bla bla.

                                    One aspect I wished the movie had explored further is the theme of emotional
                                    dilemmas, particularly whether AI can be considered as beings with feelings. It
                                    attempts to touch on this with the "who gets to go to Heaven" theme, but the rest of
                                    the movie didn't delve as deeply into these themes as I had anticipated.

                                    Unfortunately, I don't think it's a movie for everyone; it's more enjoyable if
                                    you're already a sci-fi fan. This is one of the reasons why I wouldn't rate it a
                                    10/10. For me, that would place it on the same level as "Interstellar," a sci-fi
                                    movie so exceptional that it transcends genre preferences. Nonetheless, I still
                                    think it's one of the best scifi movies in years. While I'm tempted to say it's the
                                    best since "Interstellar," i think that sparks comparisons and I think it's more
                                    comparable to films like "Rogue One." Better, maybe, but I haven't watched that
                                    movie in years.</p>

                                <div class="review">
                                    <i class="fa-regular fa-thumbs-up d-inline-block"
                                        style="font-size: 20px; width: 100px;">
                                        <p class="d-inline-block pl-2 pr-4 like-count" style="font-size: 14px;">
                                            200</p>
                                    </i>
                                    <i class="fa-regular fa-thumbs-down d-inline-block"
                                        style="font-size: 20px; width: 100px;">
                                        <p class="d-inline-block pl-2 pr-4 dislike-count" style="font-size: 14px;">20
                                        </p>
                                    </i>
                                </div>

                            </div>
                        </div>
                    </div>


                    <button class="mt-2 mr-4 link-to-review open-popup" style="align-items: center;">
                        <p class="mb-0 p-1" style="color: rgb(92, 0, 252);;"><i class="fa-solid fa-plus"
                                style="color: rgb(92, 0, 252);;"></i> Review</p>
                    </button>

                    <div id="review-popup" class="popup" style="color: black;">
                        <div class="popup-content">
                            <span class="close close-popup">&times;</span>
                            <h2>Write a Review</h2>
                            <img src="img/vebinh1.jpg" alt="" class="d-inline-block mb-1 justify-content-center"
                                style="width: 40px; height: 60px;">
                            <div class="d-inline-block ml-3 mb-4">
                                <h5>Ve binh giai ngan ha</h5>
                            </div>
                            <form id="review-form" style="width: 100%;">
                                <table>
                                    <tr>
                                        <td><label for="rating">Rating:</label></td>
                                        <td><select id="rating" name="rating">
                                                <option value="1">1 Star</option>
                                                <option value="2">2 Stars</option>
                                                <option value="3">3 Stars</option>
                                                <option value="4">4 Stars</option>
                                                <option value="5">5 Stars</option>
                                                <option value="6">6 Stars</option>
                                                <option value="7">7 Stars</option>
                                                <option value="8">8 Stars</option>
                                                <option value="9">9 Stars</option>
                                                <option value="10">10 Stars</option>
                                            </select></td>
                                    </tr>
                                    <tr>
                                        <td><label for="title">Title:</label></td>
                                        <td><input type="text" id="title" name="title" style="width: 340px;"
                                                placeholder="Title"></td>
                                    </tr>
                                    <tr>
                                        <td><label for="content">Review:</label></td>
                                        <td><textarea id="content" name="content" style="width: 340px;"
                                                placeholder="Content"></textarea></td>
                                    </tr>
                                </table>

                                <button type="button" class="cancel-button close-popup">Cancel</button>
                                <button type="submit" class="submit-button">Submit Review</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>


    <!-- Footer -->
    <?php
    include 'footer.php';
    ?>

</body>

</html>