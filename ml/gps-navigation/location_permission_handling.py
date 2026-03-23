import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter_tts/flutter_tts.dart';

class NavigationScreen extends StatefulWidget {
  final String destinationText;
  const NavigationScreen({super.key, required this.destinationText});

  @override
  State<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  GoogleMapController? _mapController;
  LatLng? _start;
  LatLng? _destination;

  final Set<Marker> _markers = {};
  final Set<Polyline> _polylines = {};
  String _info = "Loading...";
  final FlutterTts _tts = FlutterTts();

  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    try {
      await _ensureLocationPermission();
      final pos = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      _start = LatLng(pos.latitude, pos.longitude);

      setState(() {
        _info = "Current location detected";
      });
    } catch (e) {
      setState(() => _info = "Error: $e");
    }
  }

  Future<void> _ensureLocationPermission() async {
    LocationPermission perm = await Geolocator.checkPermission();

    if (perm == LocationPermission.denied) {
      perm = await Geolocator.requestPermission();
    }

    if (perm == LocationPermission.deniedForever ||
        perm == LocationPermission.denied) {
      throw Exception("Location permission not granted");
    }

    final serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw Exception("Location services are OFF");
    }
  }

  @override
  Widget build(BuildContext context) {
    final start = _start;

    return Scaffold(
      appBar: AppBar(title: const Text("Navigation")),
      body: start == null
          ? Center(child: Text(_info))
          : Column(
              children: [
                Expanded(
                  child: GoogleMap(
                    initialCameraPosition: CameraPosition(target: start, zoom: 16),
                    myLocationEnabled: true,
                    markers: _markers,
                    polylines: _polylines,
                    onMapCreated: (c) => _mapController = c,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Expanded(child: Text(_info)),
                      IconButton(
                        icon: const Icon(Icons.volume_up),
                        onPressed: () => _tts.speak(_info),
                      )
                    ],
                  ),
                )
              ],
            ),
    );
  }
}