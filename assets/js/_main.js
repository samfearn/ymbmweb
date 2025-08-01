/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(function() {
  // FitVids init
  $("#main").fitVids();

  // Sticky sidebar
  var stickySideBar = function() {
    var show =
      $(".author__urls-wrapper").find("button").length === 0
        ? $(window).width() > 1024 // width should match $large Sass variable
        : !$(".author__urls-wrapper").find("button").is(":visible");
    if (show) {
      // fix
      $(".sidebar").addClass("sticky");
    } else {
      // unfix
      $(".sidebar").removeClass("sticky");
    }
  };

  stickySideBar();

  $(window).resize(function() {
    stickySideBar();
  });

  // Follow menu drop down
  $(".author__urls-wrapper").find("button").on("click", function() {
    var author = $(this).attr("author");
    $("[author='"+author+"'].author__urls").toggleClass("is--visible");
    $("[author='"+author+"'].author__urls-wrapper").find("button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function() {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function() {
      $(".search-content").find("input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500
  });

  // Gumshoe scroll spy init
  if($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).has("> img").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  $('.page__content').find('h1, h2, h3, h4, h5, h6').each(function() {
    var id = $(this).attr('id');
    if (id) {
      var anchor = document.createElement("a");
      anchor.className = 'header-link';
      anchor.href = '#' + id;
      anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fas fa-link\"></i>';
      anchor.title = "Permalink";
      $(this).append(anchor);
    }
  });
});

var articles = document.querySelectorAll("div.grid__item:not(#noarticles),div.list__item:not(#noarticles)");
let articlesArray = Array.from(articles);
let articlesContainer = document.getElementById("articles-container");
var article;
var displayedTopics = [];
var noarticle = document.querySelector("#noarticles");
var topicFilterButton = document.querySelector("#topicFilter");
topicFilterButton.style.display = "inline-block"
var clearFilterButton = document.querySelector("#clearFilterButton");
var buttonsContainer = document.querySelector(".topics");
var topicButtons = document.querySelectorAll(".topics button");
let topicButtonsArray = Array.from(topicButtons);

function displayMenu(elt) {
	elt.classList.toggle("toggled")
	if (buttonsContainer.classList.contains("menuHidden")) {
		buttonsContainer.setAttribute("aria-hidden","false");
		buttonsContainer.style.display = "block";
		buttonsContainer.classList.remove("menuHidden");
		buttonsContainer.classList.add("menuVisible");
        clearFilterButton.setAttribute("aria-hidden","false");
        clearFilterButton.style.display = "inline-block";
		clearFilterButton.classList.remove("menuHidden");
		clearFilterButton.classList.add("menuVisible");
		for (var button of topicButtons) {
			button.classList.remove("buttonHidden");
			button.classList.add("buttonVisible");
		}
	} else {
		buttonsContainer.setAttribute("aria-hidden","true");
		buttonsContainer.classList.add("menuHidden");
		buttonsContainer.classList.remove("menuVisible");
        clearFilterButton.setAttribute("aria-hidden","true");
		clearFilterButton.style.display = "none";
		for (var button of topicButtons) {
			button.classList.add("buttonHidden");
			button.classList.remove("buttonVisible");
		}
	}
}

function topicSort(a,b) {
    // We sort the article divs based on how many topics they share with the topics selected in the filter list, in decreasing order.
    if (displayedTopics.length == 0) {
        a.setAttribute("filterMatch",1);
        b.setAttribute("filterMatch",1);
        return 0;
    }
    const atopics = a.getAttribute('topics').split('_');
    const btopics = b.getAttribute('topics').split('_');
    const commonTopicsA = displayedTopics.filter(top => atopics.includes(top)).length;
    const commonTopicsB = displayedTopics.filter(top => btopics.includes(top)).length;
    // Set/Update the filterMatch attribute so we can hide non-fitting articles
    a.setAttribute("filterMatch",commonTopicsA);
    b.setAttribute("filterMatch",commonTopicsB);
    return (commonTopicsB - commonTopicsA);
}

function toggleTopic(elt,topicToggle) {
	var noarticles = true;
	let topicButton = elt;
    const articleNodes = {}
    allArticles = articlesContainer.children;
    [...allArticles].forEach(article=>{articleNodes[article.id] = article;});
	topicButton.classList.toggle("toggled");
	if (displayedTopics.includes(topicToggle)) {
		displayedTopics = displayedTopics.filter(e => e!=topicToggle);
	} else {
		displayedTopics.push(topicToggle)
	}
    articlesArray.sort((a,b)=>topicSort(a,b));
    articlesArray.forEach(article => {
        article = articleNodes[article.id];
        articlesContainer.append(article);
        if (article.getAttribute("filterMatch")==0) {
            article.style.display = "none";
        } else {
            article.style.display = "block";
        };
        
    });
	// for (article of articles){
//         var topics = article.getAttribute('topics').split('_');
//         var hide = true;
//         var overlapTopics = displayedTopics.filter(top => !topics.includes(top));
//         if (overlapTopics.length > 0) {
//             article.style.display = "none";
//         } else {
//             article.style.display = "block";
//             noarticles = false;
//         }
//     }
//     if (noarticles) {
//         noarticle.style.display = "block";
//     } else {
//         noarticle.style.display = "none";
//     }
}

function clearFilters() {
    for (topicButton of topicButtonsArray) {
        topicButton.classList.remove("toggled");
    };
    for (article of articlesArray) {
        article.style.display = "block"
    }
    displayedTopics = [];
};
