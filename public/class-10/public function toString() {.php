public function toString() {
        // Add the canonical Url if necessary.
        if (method_exists($this->_Sender, 'CanonicalUrl') && !c('Garden.Modules.NoCanonicalUrl', false)) {
            $canonicalUrl = $this->_Sender->canonicalUrl();

            if (!empty($canonicalUrl) && !isUrl($canonicalUrl)) {
                $canonicalUrl = Gdn::router()->reverseRoute($canonicalUrl);
                $this->_Sender->canonicalUrl($canonicalUrl);
            }
            if ($canonicalUrl) {
                $this->addTag('link', ['rel' => 'canonical', 'href' => $canonicalUrl]);
            }
        }
        $this->echo{'


  <script defer type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Article",
      "headline": '. $this->title() .',
      "author": {
        "@type": "Person",
        "name": "https://github.com/lalitkumarofficial"
      },
      "description": ' . trim(Gdn_Format::reduceWhiteSpaces($this->_Sender->description())) . ',
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": ' . $canonicalUrl . '
      },
      "image": {
        "@type": "imageObject",
        "url": ' . $canonicalUrl . '
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aiforkids",
        "logo": {
          "@type": "imageObject",
          "url": "/favicon-96x96.png"
        }
      }
    }
  </script>
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://aiforkids.in/",
    "logo": "https://aiforkids.in/favicon-96x96.png"
}
</script>
<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://aiforkids.in/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://aiforkids.in/search?s={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
<script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "QAPage",
        "name": '. $this->title() .',
        "image": [
            '. $this->_Sender->image()[0] .'
        ],
        "mainEntity": {
            "@type": "Question",
            "@id": ' . $canonicalUrl . ',
            "name": '. $this->title() .',
            "text": '. $this->title() .',
            "answerCount": "1",
            "author": {
                "@type": "Person",
                "name": "Aiforkids"
            },
            "acceptedAnswer": {
                "@type": "Answer",
                "upvoteCount": "0",
                "text": {{.Content}},
                "url": ' . $canonicalUrl . ',
                "author": {
                    "@type": "Person",
                    "name": Aiforkids
                }
            },
            "suggestedAnswer": []
        }
    }</script>


'

        }
        // Include facebook open-graph meta information.
        if ($fbAppID = c('Plugins.Facebook.ApplicationID')) {
            $this->addTag('meta', ['property' => 'fb:app_id', 'content' => $fbAppID]);
        }

        $siteName = c('Garden.Title', '');
        if ($siteName != '') {
            $this->addTag('meta', ['property' => 'og:site_name', 'content' => $siteName]);
        }

        $title = htmlEntityDecode(Gdn_Format::text($this->title('', true)));
        if ($title != '') {
            $this->addTag('meta', ['name' => 'twitter:title', 'property' => 'og:title', 'content' => $title]);
        }

        if (isset($canonicalUrl)) {
            $this->addTag('meta', ['property' => 'og:url', 'content' => $canonicalUrl]);
        }

        if ($description = trim(Gdn_Format::reduceWhiteSpaces($this->_Sender->description()))) {
            $this->addTag('meta', ['name' => 'description', 'property' => 'og:description', 'content' => $description]);
          
            <!-- Description Tags -->


        }

        if ($robots = $this->_Sender->data('_robots')) {
            $this->addTag('meta', ['name' => 'robots', 'content' => $robots]);
        }

        $hasRelevantImage = false;

        // Default to the site logo if there were no images provided by the controller.
        if (count($this->_Sender->image()) == 0) {
            $logo = c('Garden.ShareImage', c('Garden.Logo', ''));
            if ($logo != '') {
                // Fix the logo path.
                if (stringBeginsWith($logo, 'uploads/')) {
                    $logo = substr($logo, strlen('uploads/'));
                }

                $logo = Gdn_Upload::url($logo);
                $this->addTag('meta', ['property' => 'og:image', 'content' => $logo]);
               
               
            }
        } else {
            foreach ($this->_Sender->image() as $img) {
                $this->addTag('meta', ['name' => 'twitter:image', 'property' => 'og:image', 'content' => $img]);
                $hasRelevantImage = true;
                
            }
        }

        // For the moment at least, only discussions are supported.
        if ($title && val('DiscussionID', $this->_Sender)) {
            if ($hasRelevantImage) {
                $twitterCardType = 'summary_large_image';
            } else {
                $twitterCardType = 'summary';
            }

            // Let's force a description for the image card since it makes sense to see a card with only an image and a title.
            if (!$description && $twitterCardType === 'summary_large_image') {
                $description = '...';
            }

            // Card && Title && Description are required
            if ($twitterCardType && $description) {
                $this->addTag('meta', ['name' => 'twitter:description', 'content' => $description]);
                $this->addTag('meta', ['name' => 'twitter:card', 'content' => $twitterCardType]);
            }
        }

        if ($this->jsonLD) {
            $this->addTag('script', ['type' => 'application/ld+json'], json_encode($this->jsonLD));
        }

        $this->fireEvent('BeforeToString');

        // Make sure that css loads before js (for jquery)
        usort($this->tags, ['HeadModule', 'TagCmp']); // "link" comes before "script"

        $this->eventManager->fireArray('HeadTagsBeforeRender', [&$this->tags]);

        // Start with the title.
        $head = '<title>'.Gdn_Format::text($this->title())."</title>\n";

        $tagStrings = [];
        // Loop through each tag.
        foreach ($this->tags as $index => $attributes) {
            $tag = $attributes[self::TAG_KEY];

            // Inline the content of the tag, if necessary.
            if (($attributes['_hint'] ?? false) == 'inline') {
                $path = ($attributes['_path'] ?? false);
                if ($path && !stringBeginsWith($path, 'http')) {
                    $attributes[self::CONTENT_KEY] = file_get_contents($path);

                    if (isset($attributes['src'])) {
                        $attributes['_src'] = $attributes['src'];
                        unset($attributes['src']);
                    }
                    if (isset($attributes['href'])) {
                        $attributes['_href'] = $attributes['href'];
                        unset($attributes['href']);
                    }
                }
            }

            // If we set an IE conditional AND a "Not IE" condition, we will need to make a second pass.
            do {
                // Reset tag string
                $tagString = '';

                // IE conditional? Validates condition.
                $iESpecific = (isset($attributes['_ie']) && preg_match('/((l|g)t(e)? )?IE [0-9\.]/', $attributes['_ie']));

                // Only allow $NotIE if we're not doing a conditional this loop.
                $notIE = (!$iESpecific && isset($attributes['_notie']));

                // Open IE conditional tag
                if ($iESpecific) {
                    $tagString .= '<!--[if '.$attributes['_ie'].']>';
                }
                if ($notIE) {
                    $tagString .= '<!--[if !IE]> -->';
                }

                // Build tag
                $tagString .= '  <'.$tag.attribute($attributes, '_');
                if (array_key_exists(self::CONTENT_KEY, $attributes)) {
                    $tagString .= '>'.$attributes[self::CONTENT_KEY].'</'.$tag.'>';
                } elseif ($tag == 'script') {
                    $tagString .= '></script>';
                } else {
                    $tagString .= ' />';
                }

                // Close IE conditional tag
                if ($iESpecific) {
                    $tagString .= '<![endif]-->';
                }
                if ($notIE) {
                    $tagString .= '<!-- <![endif]-->';
                }

                // Cleanup (prevent infinite loop)
                if ($iESpecific) {
                    unset($attributes['_ie']);
                }

                $tagStrings[] = $tagString;
            } while ($iESpecific && isset($attributes['_notie'])); // We need a second pass
        } //endforeach

        $head .= implode("\n", array_unique($tagStrings));

        foreach ($this->strings as $string) {
            $head .= $string;
            $head .= "\n";
        }

        // Add the HTML from the AssetPreloader
        $head .= "\n";
        $head .= "  <noscript><style>body {visibility: visible !important;}</style></noscript>";
        $head .= "\n";
        $head .= $this->assetPreloadModel->renderHtml();

        return $head;
    }