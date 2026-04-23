document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.getAttribute("data-page");
  document.querySelectorAll(".nav-link").forEach(function (link) {
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  function makeSparklineUrl(strokeColor, fillColor, path) {
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='364' height='86' viewBox='0 0 364 86'>" +
      "<path d='" + path + "V86H0Z' fill='" + fillColor + "'/>" +
      "<path d='" + path + "' stroke='" + strokeColor + "' stroke-width='3' fill='none'/>" +
      "</svg>";
    return "url(\"data:image/svg+xml," + encodeURIComponent(svg) + "\")";
  }

  var sparklinePresets = {
    blue: {
      surface: "#eef4ff",
      stroke: "#497af5",
      fill: "#dce9ff",
      paths: {
        "7d": "M0 58C26 55 42 47 70 49C97 51 111 68 138 70C165 72 184 56 211 44C240 31 257 28 287 34C316 40 339 36 364 24",
        "1m": "M0 70C32 68 48 69 72 69C101 69 112 69 136 60C164 49 182 46 212 48C241 50 258 56 286 53C311 50 334 42 352 43L364 37",
        "3m": "M0 64C31 62 48 54 74 42C103 29 120 26 150 35C181 44 197 60 226 58C254 56 270 46 299 38C325 31 343 34 364 20",
        "1y": "M0 66C25 68 43 71 71 63C98 55 115 36 142 29C171 22 188 34 218 46C245 57 263 60 292 52C321 44 338 24 364 12"
      }
    },
    green: {
      surface: "#eefaf5",
      stroke: "#49c38a",
      fill: "#dcf6eb",
      paths: {
        "7d": "M0 42C26 44 44 51 70 54C100 57 117 45 145 41C174 36 192 33 221 35C249 37 268 46 297 44C324 42 343 34 364 30",
        "1m": "M0 46C28 48 49 50 78 50C106 50 126 46 150 44C179 41 198 39 228 38C257 37 278 36 308 37C333 38 347 40 364 42",
        "3m": "M0 52C31 54 50 48 79 43C108 38 126 28 154 31C181 34 198 49 228 54C255 58 271 55 302 47C330 39 346 26 364 20",
        "1y": "M0 58C26 60 45 63 73 58C101 53 118 42 145 28C175 13 194 11 224 20C252 28 269 47 299 54C326 60 344 55 364 49"
      }
    },
    "blue-down": {
      surface: "#eef4ff",
      stroke: "#497af5",
      fill: "#dce9ff",
      paths: {
        "7d": "M0 20C26 18 45 22 74 34C101 45 118 62 146 66C175 70 193 64 223 54C252 44 268 36 299 32C325 28 343 26 364 24",
        "1m": "M0 26C25 25 40 28 66 34C93 40 111 48 140 48C170 48 187 40 214 39C245 38 261 39 292 37C322 35 340 33 364 30",
        "3m": "M0 18C27 20 45 31 72 42C100 53 116 59 146 56C175 53 192 41 223 33C250 26 268 29 296 33C322 36 340 32 364 27",
        "1y": "M0 24C28 29 46 44 73 55C100 66 117 72 148 69C178 66 195 49 225 36C253 24 269 23 299 28C326 32 343 30 364 22"
      }
    },
    pink: {
      surface: "#fff2f6",
      stroke: "#ff4d7d",
      fill: "#ffe1ea",
      paths: {
        "7d": "M0 30C26 38 43 52 71 62C98 72 116 68 147 56C176 44 192 33 223 41C251 49 268 67 296 71C322 75 340 66 364 57",
        "1m": "M0 26C28 34 48 44 82 58C111 70 129 64 156 59C184 54 201 47 230 56C260 65 279 72 307 70C330 68 346 65 364 64",
        "3m": "M0 24C29 28 47 39 76 50C104 61 121 66 150 60C178 54 196 42 225 39C252 36 269 45 298 54C324 62 343 61 364 58",
        "1y": "M0 34C27 48 44 63 71 70C101 78 118 73 146 61C174 49 192 37 223 35C250 33 268 44 296 58C324 72 343 76 364 68"
      }
    },
    "blue-rise": {
      surface: "#eef4ff",
      stroke: "#497af5",
      fill: "#dce9ff",
      paths: {
        "7d": "M0 68C27 67 44 62 72 56C99 50 117 43 146 39C175 35 193 33 224 32C252 31 269 27 300 23C326 20 344 18 364 16",
        "1m": "M0 62C28 62 46 60 76 54C104 48 123 42 150 41C179 40 197 44 226 41C256 38 274 33 304 30C329 28 345 28 364 29",
        "3m": "M0 72C30 70 47 64 76 55C104 46 121 34 151 28C180 22 197 25 225 31C254 37 271 37 302 31C329 25 345 17 364 12",
        "1y": "M0 74C27 72 43 66 71 54C100 42 117 24 145 16C174 8 191 11 220 19C247 27 264 42 294 43C321 44 339 29 364 20"
      }
    },
    gray: {
      surface: "#f2f5fa",
      stroke: "#bcc5d5",
      fill: "#f2f5fa",
      paths: {
        "7d": "M0 52C28 52 45 52 73 51C101 50 118 49 145 49C175 49 192 50 222 50C251 50 269 49 299 49C326 49 344 50 364 50",
        "1m": "M0 54C27 54 44 54 72 54C99 54 117 48 144 48C173 48 190 50 220 49C249 48 266 46 294 46C324 46 341 48 364 49",
        "3m": "M0 55C27 54 44 52 72 50C101 48 118 47 146 46C175 45 192 46 221 47C250 48 267 48 297 47C325 46 343 45 364 44",
        "1y": "M0 56C29 55 47 53 76 50C104 47 121 45 150 43C180 41 197 43 226 45C255 47 273 49 303 47C330 45 347 42 364 40"
      }
    }
  };

  function paintRateBoard(board) {
    if (!board) {
      return;
    }

    var range = board.getAttribute("data-range") || "1m";
    board.querySelectorAll("[data-sparkline-series]").forEach(function (sparkline) {
      var key = sparkline.getAttribute("data-sparkline-series");
      var preset = sparklinePresets[key];

      if (!preset) {
        return;
      }

      sparkline.style.backgroundColor = preset.surface;
      sparkline.style.backgroundImage = makeSparklineUrl(
        preset.stroke,
        preset.fill,
        preset.paths[range] || preset.paths["1m"]
      );
    });
  }

  document.querySelectorAll("[data-rate-tabs]").forEach(function (group) {
    var tabs = group.querySelectorAll("[data-rate-range]");
    var board = group.closest("[data-rate-board]") || group.closest(".rates-table");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (item) {
          item.classList.remove("is-active");
          item.setAttribute("aria-pressed", "false");
        });

        tab.classList.add("is-active");
        tab.setAttribute("aria-pressed", "true");

        if (board) {
          board.setAttribute("data-range", tab.getAttribute("data-rate-range") || "1m");
          paintRateBoard(board);
        }
      });
    });

    if (board) {
      paintRateBoard(board);
    }
  });

  var calculators = document.querySelectorAll("[data-calculator]");
  var currencyMeta = {
    PHP: { label: "披索", icon: "🇵🇭", className: "flag-coin", rateToUsdt: 1 / 56.3 },
    USDT: { label: "USDT", icon: "₮", className: "usdt-coin", rateToUsdt: 1 },
    THB: { label: "泰铢", icon: "🇹🇭", className: "flag-coin", rateToUsdt: 1.65 / 56.3 },
    CNY: { label: "人民币", icon: "🇨🇳", className: "flag-coin", rateToUsdt: 0.14 },
    USD: { label: "美元", icon: "🇺🇸", className: "flag-coin", rateToUsdt: 58.55 / 56.3 },
    VND: { label: "越南盾", icon: "🇻🇳", className: "flag-coin", rateToUsdt: 2.4 / (1000 * 56.3) }
  };

  function formatAmount(value) {
    if (!isFinite(value)) {
      return "0";
    }
    if (Math.abs(value) >= 1000) {
      return new Intl.NumberFormat("zh-CN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(value);
    }
    return new Intl.NumberFormat("zh-CN", {
      minimumFractionDigits: value < 1 ? 2 : 0,
      maximumFractionDigits: 4
    }).format(value);
  }

  function formatRate(value) {
    return new Intl.NumberFormat("zh-CN", {
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 4
    }).format(value);
  }

  function updateTimestamp(target) {
    if (!target) {
      return;
    }
    var now = new Date();
    var stamp =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      ":" +
      String(now.getSeconds()).padStart(2, "0") +
      " (UTC+8)";
    target.textContent = "更新时间: " + stamp;
  }

  calculators.forEach(function (calculator) {
    var fromSelect = calculator.querySelector("[data-calc-from]");
    var toSelect = calculator.querySelector("[data-calc-to]");
    var amountInput = calculator.querySelector("[data-calc-amount]");
    var resultNode = calculator.querySelector("[data-calc-result]");
    var rateNode = calculator.querySelector("[data-calc-rate]");
    var updatedNode = calculator.querySelector("[data-calc-updated]");
    var fromCoinNode = calculator.querySelector("[data-calc-from-coin]");
    var toCoinNode = calculator.querySelector("[data-calc-to-coin]");
    var swapButton = calculator.querySelector("[data-calc-swap]");
    var shortcutButtons = calculator.querySelectorAll("[data-calc-add]");

    function paintCoin(node, code) {
      var meta = currencyMeta[code];
      if (!node || !meta) {
        return;
      }
      node.textContent = meta.icon;
      node.className = "calc-coin " + meta.className;
    }

    function calculate() {
      var fromCode = fromSelect.value;
      var toCode = toSelect.value;
      var fromMeta = currencyMeta[fromCode];
      var toMeta = currencyMeta[toCode];
      var fromOption = fromSelect.options[fromSelect.selectedIndex];
      var toOption = toSelect.options[toSelect.selectedIndex];
      var fromLabel = fromOption.getAttribute("data-rate-label") || fromOption.textContent;
      var toLabel = toOption.getAttribute("data-rate-label") || toOption.textContent;
      var amount = parseFloat(amountInput.value || "0");
      if (!isFinite(amount) || amount < 0) {
        amount = 0;
      }

      if (fromCode === toCode) {
        resultNode.textContent = formatAmount(amount);
        rateNode.textContent = "1 " + fromLabel + " = 1 " + toLabel;
      } else {
        var result = amount * fromMeta.rateToUsdt / toMeta.rateToUsdt;
        var unitRate = fromMeta.rateToUsdt / toMeta.rateToUsdt;
        resultNode.textContent = formatAmount(result);
        rateNode.textContent = "1 " + fromLabel + " = " + formatRate(unitRate) + " " + toLabel;
      }

      paintCoin(fromCoinNode, fromCode);
      paintCoin(toCoinNode, toCode);
      updateTimestamp(updatedNode);
    }

    fromSelect.addEventListener("change", calculate);
    toSelect.addEventListener("change", calculate);
    amountInput.addEventListener("input", calculate);

    if (swapButton) {
      swapButton.addEventListener("click", function () {
        var currentFrom = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = currentFrom;
        calculate();
      });
    }

    shortcutButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var delta = parseFloat(button.getAttribute("data-calc-add") || "0");
        var current = parseFloat(amountInput.value || "0");
        if (!isFinite(current)) {
          current = 0;
        }
        amountInput.value = String(current + delta);
        calculate();
      });
    });

    calculate();
  });

  function detectDownloadPlatform() {
    var ua = (window.navigator.userAgent || "").toLowerCase();
    if (/iphone|ipad|ipod|mac os/.test(ua) && /mobile|iphone|ipad|ipod/.test(ua)) {
      return "ios";
    }
    if (/android/.test(ua)) {
      return "android";
    }
    return "ios";
  }

  function buildDownloadModal() {
    var root = document.createElement("div");
    root.className = "download-modal is-hidden";
    root.setAttribute("data-download-modal", "");
    root.setAttribute("aria-hidden", "true");
    root.innerHTML =
      "<div class='download-modal-backdrop' data-download-close></div>" +
      "<section class='download-modal-dialog' role='dialog' aria-modal='true' aria-labelledby='downloadModalTitle'>" +
        "<button class='download-modal-close' type='button' data-download-close aria-label='关闭下载弹层'>×</button>" +
        "<div class='download-modal-copy'>" +
          "<span class='download-modal-eyebrow'>下载 App</span>" +
          "<h2 id='downloadModalTitle'>下载易换 App</h2>" +
          "<p class='download-modal-desc'>请根据当前设备系统选择对应安装包。</p>" +
        "</div>" +
        "<div class='download-platform-switch' role='tablist' aria-label='选择安装包系统'>" +
          "<button class='download-platform-btn' type='button' data-download-platform='ios'>iOS 下载</button>" +
          "<button class='download-platform-btn' type='button' data-download-platform='android'>Android 下载</button>" +
        "</div>" +
        "<div class='download-modal-body'>" +
          "<div class='download-qr-card'>" +
            "<div class='download-qr-box'>" +
              "<div class='download-qr-pattern'></div>" +
              "<span class='download-qr-center' data-download-platform-label>iOS</span>" +
            "</div>" +
            "<p class='download-qr-caption' data-download-platform-caption>请使用手机扫码下载 iOS 安装包</p>" +
          "</div>" +
          "<div class='download-modal-side'>" +
            "<div class='download-side-card'>" +
              "<strong>当前下载方式</strong>" +
              "<p data-download-side-copy>已为你切换到 iOS 安装包展示。</p>" +
            "</div>" +
            "<div class='download-side-card'>" +
              "<strong>安装遇到问题？</strong>" +
              "<p>如遇安装或打开问题，可直接联系平台客服协助处理。</p>" +
              "<a class='download-side-link' href='support.html'>联系客服</a>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";

    document.body.appendChild(root);
    return root;
  }

  function initDownloadModal() {
    var downloadTriggerSelector = [
      "a[href='#download']",
      "a[href='index.html#download']",
      "a[href='#rates-download']",
      "a[href='index.html#rates-download']",
      "a[href='rates.html#rates-download']"
    ].join(",");

    if (!document.querySelector(downloadTriggerSelector)) {
      return;
    }

    var modal = buildDownloadModal();
    var modalDialog = modal.querySelector(".download-modal-dialog");
    var closeNodes = modal.querySelectorAll("[data-download-close]");
    var platformButtons = Array.from(modal.querySelectorAll("[data-download-platform]"));
    var platformLabel = modal.querySelector("[data-download-platform-label]");
    var platformCaption = modal.querySelector("[data-download-platform-caption]");
    var sideCopy = modal.querySelector("[data-download-side-copy]");
    var currentPlatform = detectDownloadPlatform();

    function setPlatform(platform) {
      currentPlatform = platform === "android" ? "android" : "ios";
      var isIos = currentPlatform === "ios";

      platformButtons.forEach(function (button) {
        var active = button.getAttribute("data-download-platform") === currentPlatform;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (platformLabel) {
        platformLabel.textContent = isIos ? "iOS" : "Android";
      }

      if (platformCaption) {
        platformCaption.textContent = isIos
          ? "请使用手机扫码下载 iOS 安装包"
          : "请使用手机扫码下载 Android 安装包";
      }

      if (sideCopy) {
        sideCopy.textContent = isIos
          ? "已为你切换到 iOS 安装包展示。"
          : "已为你切换到 Android 安装包展示。";
      }

      modalDialog.setAttribute("data-platform", currentPlatform);
    }

    function openDownloadModal(platform) {
      setPlatform(platform || detectDownloadPlatform());
      modal.classList.remove("is-hidden");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("download-modal-open");
    }

    function closeDownloadModal() {
      modal.classList.add("is-hidden");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("download-modal-open");
    }

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest(downloadTriggerSelector);
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openDownloadModal();
    });

    closeNodes.forEach(function (node) {
      node.addEventListener("click", function () {
        closeDownloadModal();
      });
    });

    platformButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setPlatform(button.getAttribute("data-download-platform") || "ios");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.classList.contains("is-hidden")) {
        closeDownloadModal();
      }
    });

    setPlatform(currentPlatform);
  }

  initDownloadModal();

  var academyHomeRoot = document.querySelector("[data-academy-home]");
  if (academyHomeRoot) {
    var academyLinks = Array.from(document.querySelectorAll("[data-academy-scroll]"));

    function spotlightAcademySection(id) {
      if (!id) {
        return;
      }

      var section = document.getElementById(id);
      if (!section) {
        return;
      }

      section.scrollIntoView({ behavior: "smooth", block: "start" });
      section.classList.remove("is-spotlight");
      window.requestAnimationFrame(function () {
        section.classList.add("is-spotlight");
      });
      window.setTimeout(function () {
        section.classList.remove("is-spotlight");
      }, 1900);
    }

    academyLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("data-academy-scroll");
        if (!targetId) {
          return;
        }
        event.preventDefault();
        spotlightAcademySection(targetId);
      });
    });
  }

  var partnerBoard = document.querySelector("[data-partners-map-board]");
  if (partnerBoard) {
    var partnerCards = Array.from(document.querySelectorAll("[data-partner-card]"));
    var partnerMarkers = Array.from(document.querySelectorAll("[data-partner-marker]"));
    var partnerCallout = partnerBoard.querySelector("[data-partners-callout]");
    var partnerCalloutName = partnerBoard.querySelector("[data-partners-callout-name]");
    var partnerCalloutMeta = partnerBoard.querySelector("[data-partners-callout-meta]");
    var partnerCalloutLink = partnerBoard.querySelector("[data-partners-callout-link]");
    var partnerCount = document.querySelector("[data-partners-count]");
    var partnerPage = document.querySelector("[data-partners-page]");
    var partnerEmpty = document.querySelector("[data-partners-empty]");
    var partnerPrev = document.querySelector("[data-partners-prev]");
    var partnerNext = document.querySelector("[data-partners-next]");
    var partnerPageList = document.querySelector("[data-partners-page-list]");
    var partnerSearch = document.querySelector("[data-partners-search]");
    var partnerReset = document.querySelector("[data-partners-reset]");
    var partnerCityDropdown = document.querySelector("[data-partners-city-dropdown]");
    var partnerCityTrigger = document.querySelector("[data-partners-city-trigger]");
    var partnerCityMenu = document.querySelector("[data-partners-city-menu]");
    var partnerCityValue = document.querySelector("[data-partners-city-value]");
    var partnerCityOptions = Array.from(document.querySelectorAll("[data-partners-city-option]"));
    var partnerCityBadge = document.querySelector("[data-partners-city-badge]");
    var partnerCategoryPills = Array.from(document.querySelectorAll("[data-partners-category]"));
    var activePartnerId = "";
    var activeCategory = "all";
    var activeCity = "马尼拉";
    var partnerPageSize = 4;
    var currentPartnerPage = 1;

    function getPartnerCard(id) {
      return partnerCards.find(function (card) {
        return card.getAttribute("data-partner-id") === id;
      });
    }

    function getPartnerMarker(id) {
      return partnerMarkers.find(function (marker) {
        return marker.getAttribute("data-partner-id") === id;
      });
    }

    function getFilteredPartnerCards() {
      return partnerCards.filter(function (card) {
        return !card.classList.contains("is-hidden");
      });
    }

    function updatePartnerSummary(count, totalPages) {
      if (partnerCount) {
        partnerCount.textContent = count ? "共 " + count + " 家商家" : "暂无匹配商家";
      }

      if (partnerPage) {
        partnerPage.textContent = count ? "第 " + currentPartnerPage + " / " + totalPages + " 页" : "请调整筛选";
      }
    }

    function renderPartnerPagination(totalPages) {
      if (!partnerPageList) {
        return;
      }

      partnerPageList.innerHTML = "";

      for (var page = 1; page <= totalPages; page += 1) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "partners-page-btn" + (page === currentPartnerPage ? " is-active" : "");
        button.textContent = String(page);
        button.setAttribute("data-partners-page-number", String(page));
        button.addEventListener("click", function (event) {
          var pageValue = parseInt(event.currentTarget.getAttribute("data-partners-page-number") || "1", 10);
          currentPartnerPage = pageValue;
          applyPartnerFilters();
        });
        partnerPageList.appendChild(button);
      }

      if (partnerPrev) {
        var prevDisabled = currentPartnerPage <= 1 || totalPages <= 1;
        partnerPrev.disabled = prevDisabled;
        partnerPrev.classList.toggle("is-disabled", prevDisabled);
      }

      if (partnerNext) {
        var nextDisabled = currentPartnerPage >= totalPages || totalPages <= 1;
        partnerNext.disabled = nextDisabled;
        partnerNext.classList.toggle("is-disabled", nextDisabled);
      }
    }

    function placePartnerCallout(marker) {
      if (!partnerCallout || !marker) {
        return;
      }

      var calloutWidth = partnerCallout.offsetWidth || 196;
      var calloutHeight = partnerCallout.offsetHeight || 72;
      var left = marker.offsetLeft + marker.offsetWidth + 16;
      var top = marker.offsetTop - 18;

      if (left + calloutWidth > partnerBoard.clientWidth - 18) {
        left = marker.offsetLeft - calloutWidth - 16;
      }

      if (left < 16) {
        left = 16;
      }

      if (top < 16) {
        top = 16;
      }

      if (top + calloutHeight > partnerBoard.clientHeight - 16) {
        top = partnerBoard.clientHeight - calloutHeight - 16;
      }

      partnerCallout.style.left = left + "px";
      partnerCallout.style.top = top + "px";
    }

    function activatePartner(id) {
      var card = getPartnerCard(id);
      var marker = getPartnerMarker(id);

      if (!card || !marker || card.classList.contains("is-hidden") || marker.classList.contains("is-hidden")) {
        return;
      }

      activePartnerId = id;

      partnerCards.forEach(function (item) {
        var isActive = item === card;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      partnerMarkers.forEach(function (item) {
        item.classList.toggle("is-active", item === marker);
      });

      if (partnerCalloutName) {
        partnerCalloutName.textContent = card.getAttribute("data-partner-name") || "";
      }

      if (partnerCalloutMeta) {
        partnerCalloutMeta.textContent = card.getAttribute("data-partner-meta") || "";
      }

      if (partnerCalloutLink) {
        partnerCalloutLink.setAttribute("href", "partner-detail.html?merchant=" + id);
      }

      placePartnerCallout(marker);
    }

    function partnerMatchesFilters(card) {
      var categories = (card.getAttribute("data-partner-category") || "")
        .split(",")
        .map(function (item) {
          return item.trim();
        })
        .filter(Boolean);
      var categoryMatched = activeCategory === "all" || categories.indexOf(activeCategory) !== -1;
      var keyword = partnerSearch ? partnerSearch.value.trim().toLowerCase() : "";
      var searchSource = [
        card.getAttribute("data-partner-name") || "",
        card.getAttribute("data-partner-meta") || "",
        card.textContent || ""
      ].join(" ").toLowerCase();
      var searchMatched = !keyword || searchSource.indexOf(keyword) !== -1;

      return categoryMatched && searchMatched;
    }

    function applyPartnerFilters() {
      var filteredCards = partnerCards.filter(function (card) {
        var matched = partnerMatchesFilters(card);
        card.classList.toggle("is-hidden", !matched);
        return matched;
      });

      var totalPages = Math.max(1, Math.ceil(filteredCards.length / partnerPageSize));
      currentPartnerPage = Math.min(currentPartnerPage, totalPages);
      currentPartnerPage = Math.max(1, currentPartnerPage);

      var startIndex = (currentPartnerPage - 1) * partnerPageSize;
      var pagedCards = filteredCards.filter(function (card, index) {
        var inPage = index >= startIndex && index < startIndex + partnerPageSize;
        card.classList.toggle("is-page-hidden", !inPage);
        return inPage;
      });

      partnerCards.forEach(function (card) {
        if (card.classList.contains("is-hidden")) {
          card.classList.remove("is-page-hidden");
        }
      });

      partnerMarkers.forEach(function (marker) {
        var relatedCard = getPartnerCard(marker.getAttribute("data-partner-id") || "");
        var visible = !!relatedCard && !relatedCard.classList.contains("is-hidden") && !relatedCard.classList.contains("is-page-hidden");
        marker.classList.toggle("is-hidden", !visible);
      });

      if (partnerEmpty) {
        partnerEmpty.classList.toggle("is-hidden", filteredCards.length > 0);
      }

      updatePartnerSummary(filteredCards.length, totalPages);
      renderPartnerPagination(totalPages);

      if (!filteredCards.length) {
        partnerCards.forEach(function (card) {
          card.classList.remove("is-active");
          card.setAttribute("aria-pressed", "false");
        });

        partnerMarkers.forEach(function (marker) {
          marker.classList.remove("is-active");
        });

        activePartnerId = "";

        if (partnerCallout) {
          partnerCallout.classList.add("is-hidden");
        }

        return;
      }

      if (partnerCallout) {
        partnerCallout.classList.remove("is-hidden");
      }

      var activeCard = activePartnerId ? getPartnerCard(activePartnerId) : null;
      if (!activeCard || activeCard.classList.contains("is-hidden") || activeCard.classList.contains("is-page-hidden")) {
        activatePartner(pagedCards[0].getAttribute("data-partner-id") || "");
      } else {
        activatePartner(activePartnerId);
      }
    }

    partnerCards.forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-pressed", card.classList.contains("is-active") ? "true" : "false");

      card.addEventListener("click", function () {
        activatePartner(card.getAttribute("data-partner-id") || "");
      });

      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activatePartner(card.getAttribute("data-partner-id") || "");
        }
      });
    });

    partnerMarkers.forEach(function (marker) {
      marker.addEventListener("click", function () {
        activatePartner(marker.getAttribute("data-partner-id") || "");
      });
    });

    window.addEventListener("resize", function () {
      if (activePartnerId) {
        var marker = getPartnerMarker(activePartnerId);
        placePartnerCallout(marker);
      }
    });

    partnerCategoryPills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        activeCategory = pill.getAttribute("data-partners-category") || "all";
        currentPartnerPage = 1;
        partnerCategoryPills.forEach(function (item) {
          item.classList.toggle("is-active", item === pill);
        });
        applyPartnerFilters();
      });
    });

    if (partnerSearch) {
      partnerSearch.addEventListener("input", function () {
        currentPartnerPage = 1;
        applyPartnerFilters();
      });
    }

    if (partnerReset) {
      partnerReset.addEventListener("click", function () {
        activeCategory = "all";
        currentPartnerPage = 1;
        if (partnerSearch) {
          partnerSearch.value = "";
        }
        partnerCategoryPills.forEach(function (pill) {
          pill.classList.toggle("is-active", (pill.getAttribute("data-partners-category") || "all") === "all");
        });
        activeCity = "马尼拉";
        if (partnerCityValue) {
          partnerCityValue.textContent = activeCity;
        }
        if (partnerCityBadge) {
          partnerCityBadge.textContent = activeCity + " · 实时更新";
        }
        partnerCityOptions.forEach(function (option) {
          option.classList.toggle("is-active", option.getAttribute("data-partners-city-option") === activeCity);
        });
        if (partnerCityMenu) {
          partnerCityMenu.classList.add("is-hidden");
        }
        if (partnerCityTrigger) {
          partnerCityTrigger.setAttribute("aria-expanded", "false");
        }
        applyPartnerFilters();
      });
    }

    if (partnerPrev) {
      partnerPrev.addEventListener("click", function () {
        if (currentPartnerPage > 1) {
          currentPartnerPage -= 1;
          applyPartnerFilters();
        }
      });
    }

    if (partnerNext) {
      partnerNext.addEventListener("click", function () {
        currentPartnerPage += 1;
        applyPartnerFilters();
      });
    }

    if (partnerCityDropdown && partnerCityTrigger && partnerCityMenu) {
      partnerCityTrigger.addEventListener("click", function () {
        var expanded = partnerCityTrigger.getAttribute("aria-expanded") === "true";
        partnerCityTrigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        partnerCityMenu.classList.toggle("is-hidden", expanded);
      });

      partnerCityOptions.forEach(function (option) {
        option.addEventListener("click", function () {
          activeCity = option.getAttribute("data-partners-city-option") || "马尼拉";
          if (partnerCityValue) {
            partnerCityValue.textContent = activeCity;
          }
          if (partnerCityBadge) {
            partnerCityBadge.textContent = activeCity + " · 实时更新";
          }
          partnerCityOptions.forEach(function (item) {
            item.classList.toggle("is-active", item === option);
          });
          partnerCityMenu.classList.add("is-hidden");
          partnerCityTrigger.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("click", function (event) {
        if (!partnerCityDropdown.contains(event.target)) {
          partnerCityMenu.classList.add("is-hidden");
          partnerCityTrigger.setAttribute("aria-expanded", "false");
        }
      });
    }

    activatePartner(
      (partnerCards.find(function (card) {
        return card.classList.contains("is-active");
      }) || partnerCards[0]).getAttribute("data-partner-id") || ""
    );
    applyPartnerFilters();
  }

  var merchantProfiles = {
    jinxiu: {
      avatar: "锦",
      name: "锦绣川味府",
      rating: "4.2",
      hours: "10:00 - 23:00",
      address: "马尼拉市中心商圈 A-102"
    },
    chayu: {
      avatar: "茶",
      name: "茶语轩 · 中式茗茶",
      rating: "4.9",
      hours: "09:00 - 21:00",
      address: "马尼拉核心商圈环球大厦 1F"
    },
    liyuan: {
      avatar: "力",
      name: "力源健身中心",
      rating: "4.5",
      hours: "06:00 - 24:00",
      address: "马尼拉大道阳光中心 3-4 层"
    },
    quanshi: {
      avatar: "全",
      name: "全时便利店",
      rating: "4.0",
      hours: "07:00 - 23:00",
      address: "滨海路 12 号"
    },
    haiwan: {
      avatar: "海",
      name: "海湾海鲜酒楼",
      rating: "4.7",
      hours: "11:00 - 22:30",
      address: "滨海生活区海景大道 88 号"
    },
    xingyu: {
      avatar: "星",
      name: "星域电玩城",
      rating: "4.6",
      hours: "12:00 - 02:00",
      address: "商务服务区银河广场 2 层"
    },
    xihu: {
      avatar: "洗",
      name: "城市洗护中心",
      rating: "4.3",
      hours: "08:00 - 22:00",
      address: "综合服务区中央街 26 号"
    },
    lanwan: {
      avatar: "蓝",
      name: "蓝湾商务酒店",
      rating: "4.5",
      hours: "全天营业",
      address: "滨海生活区蓝湾大道 16 号"
    }
  };

  var merchantCategoryMap = {
    jinxiu: "餐饮美食",
    chayu: "餐饮美食",
    liyuan: "娱乐休闲",
    quanshi: "便利店",
    haiwan: "餐饮美食",
    xingyu: "娱乐休闲",
    xihu: "生活服务",
    lanwan: "酒店住宿"
  };

  var merchantDetailExtras = {
    jinxiu: {
      likes: "21",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613429999",
      contact: "@JX008",
      categoryLine: "餐饮美食 / 川味正餐",
      tags: [
        { label: "9折" },
        { label: "到店稳定", accent: true }
      ],
      intro: "锦绣川味府主营川味热菜与堂食服务，适合聚餐与顺路到店办理线下业务。整体营业时段稳定，晚间到店体验更顺。"
    },
    chayu: {
      likes: "18",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613421088",
      contact: "@CYX016",
      categoryLine: "餐饮美食 / 茶饮简餐",
      tags: [
        { label: "折扣店" },
        { label: "晚间可用", accent: true }
      ],
      intro: "茶语轩位于核心商圈一层，门店环境安静，适合短暂停留与现场确认信息。午后和晚间人流更稳定。"
    },
    liyuan: {
      likes: "16",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613422266",
      contact: "@LYFIT09",
      categoryLine: "娱乐休闲 / 健身中心",
      tags: [
        { label: "全天时段" },
        { label: "休闲服务", accent: true }
      ],
      intro: "力源健身中心营业时段长，适合白天和夜间不同场景用户顺路到店。商场内导视清楚，整体流程直观。"
    },
    quanshi: {
      likes: "12",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613423155",
      contact: "@QS247",
      categoryLine: "生活服务 / 便利店",
      tags: [
        { label: "便利服务" },
        { label: "临街门店", accent: true }
      ],
      intro: "全时便利店靠近生活区与主路口，适合附近用户快速到店。门店体量轻，处理简单咨询和现场确认更方便。"
    },
    haiwan: {
      likes: "27",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613424411",
      contact: "@HW888",
      categoryLine: "餐饮美食 / 海鲜酒楼",
      tags: [
        { label: "热门门店" },
        { label: "到店消费", accent: true }
      ],
      intro: "海湾海鲜酒楼位于滨海生活区餐饮带，适合聚餐前后顺路到店。周边配套成熟，晚上客流会更集中。"
    },
    xingyu: {
      likes: "24",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613425522",
      contact: "@XYGAME",
      categoryLine: "娱乐休闲 / 电玩城",
      tags: [
        { label: "夜间热门" },
        { label: "周边停车", accent: true }
      ],
      intro: "星域电玩城更偏晚间客流场景，商场内指引清晰，适合下班后或夜间到店，整体停留与咨询空间更充足。"
    },
    xihu: {
      likes: "15",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613426633",
      contact: "@CITYWASH",
      categoryLine: "生活服务 / 洗护中心",
      tags: [
        { label: "洗护服务" },
        { label: "当天可取", accent: true }
      ],
      intro: "城市洗护中心位于综合服务区，周边便利店和社区入口集中，适合生活场景下顺路到店，使用路径清楚。"
    },
    lanwan: {
      likes: "19",
      region: "菲律宾 · 马尼拉",
      phone: "+63-9613427744",
      contact: "@LANWAN16",
      categoryLine: "酒店住宿 / 商务酒店",
      tags: [
        { label: "商务出行" },
        { label: "24h前台", accent: true }
      ],
      intro: "蓝湾商务酒店提供全天前台服务，适合差旅和临时住宿场景用户到店。位置靠近主路，进出与等待都更稳定。"
    }
  };

  Object.keys(merchantProfiles).forEach(function (id) {
    var profile = merchantProfiles[id];
    var category = merchantCategoryMap[id] || "分类待配置";
    var extra = merchantDetailExtras[id] || {};

    profile.likes = extra.likes || "--";
    profile.region = extra.region || "国家与地区待配置";
    profile.phone = extra.phone || "联系电话待配置";
    profile.contact = extra.contact || "联系商家待配置";
    profile.intro = extra.intro || "商家简介待补充";
    profile.categoryLine = extra.categoryLine || category;
    profile.tags = extra.tags || [
      { label: category },
      { label: "特色待配置", accent: true }
    ];
    profile.slides = [
      { src: "assets/merchant-detail/storefront.svg", alt: "商家门面示意图" },
      { src: "assets/merchant-detail/interior.svg", alt: "店内环境示意图" },
      { src: "assets/merchant-detail/landmark.svg", alt: "周边地标示意图" }
    ];
    profile.activities = [
      { src: "assets/merchant-detail/activity-a.svg", alt: "商家活动图片" },
      { src: "assets/merchant-detail/activity-b.svg", alt: "商家活动图片" }
    ];
  });

  function makeMerchantStars(rating) {
    var value = parseFloat(rating || "0");
    var full = Math.round(value);
    var stars = "";
    for (var i = 0; i < 5; i += 1) {
      stars += i < full ? "★" : "☆";
    }
    return stars;
  }

  function renderMerchantMediaCard(target, item, isPreview) {
    if (!target || !item) {
      return;
    }

    var className = "merchant-media-card" + (isPreview ? " is-preview" : "");
    if (item.placeholder) {
      className += " is-placeholder";
    }
    if (item.theme && !item.src) {
      className += " " + item.theme;
    }

    target.className = className;
    target.innerHTML =
      "<div class='merchant-media-inner'>" +
      (item.src
        ? "<img class='merchant-media-photo' src='" + item.src + "' alt='" + (item.alt || "") + "' />"
        : "") +
      (item.placeholder
        ? "<div class='merchant-media-placeholder'><span class='merchant-placeholder-icon'>店</span><span>图片上传中</span></div>"
        : "") +
      "</div>";
  }

  function renderMerchantActivityBanner(item) {
    var className = "merchant-activity-banner";
    if (item.placeholder) {
      className += " is-placeholder";
    }
    if (item.theme && !item.src) {
      className += " " + item.theme;
    }
    return (
      "<article class='" + className + "'>" +
      "<div class='merchant-activity-inner'>" +
      (item.src
        ? "<img class='merchant-activity-photo' src='" + item.src + "' alt='" + (item.alt || "") + "' />"
        : "") +
      (item.placeholder
        ? "<div class='merchant-activity-placeholder'><span class='merchant-placeholder-icon'>店</span><span>图片上传中</span></div>"
        : "") +
      "</div>" +
      "</article>"
    );
  }

  var merchantDetailRoot = document.querySelector("[data-merchant-detail]");
  if (merchantDetailRoot) {
    var merchantParams = new URLSearchParams(window.location.search);
    var merchantId = merchantParams.get("merchant") || "jinxiu";
    var merchantProfile = merchantProfiles[merchantId] || merchantProfiles.jinxiu;
    var merchantMainMedia = document.querySelector("[data-merchant-main-media]");
    var merchantPreviewA = document.querySelector("[data-merchant-preview-a]");
    var merchantPreviewB = document.querySelector("[data-merchant-preview-b]");
    var merchantPrev = document.querySelector("[data-merchant-prev]");
    var merchantNext = document.querySelector("[data-merchant-next]");
    var merchantCounter = document.querySelector("[data-merchant-gallery-counter]");
    var merchantDots = document.querySelector("[data-merchant-gallery-dots]");
    var merchantGallery = document.querySelector("[data-merchant-gallery]");
    var currentSlideIndex = 0;
    var merchantTimer = null;

    document.title = merchantProfile.name + " - 易换官网";

    var avatarNode = document.querySelector("[data-merchant-avatar]");
    var nameNode = document.querySelector("[data-merchant-name]");
    var starsNode = document.querySelector("[data-merchant-stars]");
    var ratingNode = document.querySelector("[data-merchant-rating]");
    var likesNode = document.querySelector("[data-merchant-likes]");
    var tagsNode = document.querySelector("[data-merchant-tags]");
    var categoryNode = document.querySelector("[data-merchant-category]");
    var regionNode = document.querySelector("[data-merchant-region]");
    var hoursNode = document.querySelector("[data-merchant-hours]");
    var phoneNode = document.querySelector("[data-merchant-phone]");
    var contactNode = document.querySelector("[data-merchant-contact]");
    var addressNode = document.querySelector("[data-merchant-address]");
    var introNode = document.querySelector("[data-merchant-intro]");
    var activitiesNode = document.querySelector("[data-merchant-activities]");

    if (avatarNode) {
      avatarNode.textContent = merchantProfile.avatar;
    }
    if (nameNode) {
      nameNode.textContent = merchantProfile.name;
    }
    if (starsNode) {
      starsNode.textContent = makeMerchantStars(merchantProfile.rating);
    }
    if (ratingNode) {
      ratingNode.textContent = merchantProfile.rating;
    }
    if (likesNode) {
      likesNode.textContent = merchantProfile.likes;
    }
    if (categoryNode) {
      categoryNode.textContent = merchantProfile.categoryLine;
    }
    if (regionNode) {
      regionNode.textContent = merchantProfile.region;
    }
    if (hoursNode) {
      hoursNode.textContent = merchantProfile.hours;
    }
    if (phoneNode) {
      phoneNode.textContent = merchantProfile.phone;
    }
    if (contactNode) {
      contactNode.textContent = merchantProfile.contact;
    }
    if (addressNode) {
      addressNode.textContent = merchantProfile.address;
    }
    if (introNode) {
      introNode.textContent = merchantProfile.intro;
    }
    if (tagsNode) {
      tagsNode.innerHTML = merchantProfile.tags.map(function (tag) {
        return "<span class='merchant-chip" + (tag.accent ? " is-accent" : "") + "'>" + tag.label + "</span>";
      }).join("");
    }
    if (activitiesNode) {
      activitiesNode.innerHTML = merchantProfile.activities.map(renderMerchantActivityBanner).join("");
    }

    Array.prototype.slice.call(document.querySelectorAll("[data-copy-field]")).forEach(function (button) {
      button.addEventListener("click", function () {
        var field = button.getAttribute("data-copy-field");
        var value =
          field === "address" ? merchantProfile.address :
          field === "phone" ? merchantProfile.phone :
          field === "contact" ? merchantProfile.contact :
          "";

        if (!value) {
          return;
        }

        function markCopied() {
          var oldText = button.textContent;
          button.textContent = "已复制";
          window.setTimeout(function () {
            button.textContent = oldText;
          }, 1200);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(markCopied).catch(function () {});
          return;
        }

        var input = document.createElement("textarea");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand("copy");
          markCopied();
        } catch (error) {
        }
        document.body.removeChild(input);
      });
    });

    function renderMerchantGallery() {
      var slides = merchantProfile.slides;
      if (!slides.length) {
        return;
      }

      renderMerchantMediaCard(merchantMainMedia, slides[currentSlideIndex], false);
      renderMerchantMediaCard(merchantPreviewA, slides[(currentSlideIndex + 1) % slides.length], true);
      renderMerchantMediaCard(merchantPreviewB, slides[(currentSlideIndex + 2) % slides.length], true);

      if (merchantCounter) {
        merchantCounter.textContent =
          String(currentSlideIndex + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
      }

      if (merchantDots) {
        merchantDots.innerHTML = slides.map(function (_, index) {
          return "<span class='merchant-gallery-dot" + (index === currentSlideIndex ? " is-active" : "") + "'></span>";
        }).join("");
      }
    }

    function stopMerchantTimer() {
      if (merchantTimer) {
        window.clearInterval(merchantTimer);
        merchantTimer = null;
      }
    }

    function startMerchantTimer() {
      stopMerchantTimer();
      if (merchantProfile.slides.length <= 1) {
        return;
      }

      merchantTimer = window.setInterval(function () {
        currentSlideIndex = (currentSlideIndex + 1) % merchantProfile.slides.length;
        renderMerchantGallery();
      }, 4200);
    }

    if (merchantPrev) {
      merchantPrev.addEventListener("click", function () {
        currentSlideIndex =
          (currentSlideIndex - 1 + merchantProfile.slides.length) % merchantProfile.slides.length;
        renderMerchantGallery();
        startMerchantTimer();
      });
    }

    if (merchantNext) {
      merchantNext.addEventListener("click", function () {
        currentSlideIndex = (currentSlideIndex + 1) % merchantProfile.slides.length;
        renderMerchantGallery();
        startMerchantTimer();
      });
    }

    if (merchantGallery) {
      merchantGallery.addEventListener("mouseenter", stopMerchantTimer);
      merchantGallery.addEventListener("mouseleave", startMerchantTimer);
    }

    renderMerchantGallery();
    startMerchantTimer();
  }
});
