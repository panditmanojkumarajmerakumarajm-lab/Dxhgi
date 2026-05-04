import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  MobileAds.instance.initialize();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int coins = 0;

  BannerAd? bannerAd;
  RewardedAd? rewardedAd;

  @override
  void initState() {
    super.initState();
    loadBannerAd();
    loadRewardedAd();
  }

  void loadBannerAd() {
    bannerAd = BannerAd(
      adUnitId: BannerAd.testAdUnitId, // TEST ID
      size: AdSize.banner,
      request: AdRequest(),
      listener: BannerAdListener(),
    )..load();
  }

  void loadRewardedAd() {
    RewardedAd.load(
      adUnitId: RewardedAd.testAdUnitId, // TEST ID
      request: AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (ad) {
          rewardedAd = ad;
        },
        onAdFailedToLoad: (error) {
          print("Failed to load rewarded ad: $error");
        },
      ),
    );
  }

  void showRewardedAd() {
    if (rewardedAd != null) {
      rewardedAd!.show(
        onUserEarnedReward: (AdWithoutView ad, RewardItem reward) {
          setState(() {
            coins += 10; // Reward
          });
        },
      );
      rewardedAd = null;
      loadRewardedAd();
    }
  }

  @override
  void dispose() {
    bannerAd?.dispose();
    rewardedAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Tap & Earn Demo"),
        centerTitle: true,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "Coins: $coins",
            style: TextStyle(fontSize: 24),
          ),
          SizedBox(height: 20),

          ElevatedButton(
            onPressed: showRewardedAd,
            child: Text("Watch Ad & Earn 10 Coins"),
          ),

          SizedBox(height: 30),

          if (bannerAd != null)
            Container(
              height: bannerAd!.size.height.toDouble(),
              width: bannerAd!.size.width.toDouble(),
              child: AdWidget(ad: bannerAd!),
            ),
        ],
      ),
    );
  }
}