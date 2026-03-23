import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:flutter_tts/flutter_tts.dart';

class NavigationScreen extends StatefulWidget {
  final String destinationText;
  const NavigationScreen({super.key, required this.destinationText});

  @override
  State<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  static const String googleApiKey = "YOUR_API_KEY_HERE";

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

      _destination = await _geocode(widget.destinationText);
      await _buildRoute(_start!, _destination!);

      setState(() {});
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

  Future<LatLng> _geocode(String placeText) async {
    final uri = Uri.parse(
      "https://maps.googleapis.com/maps/api/geocode/json?address=${Uri.encodeComponent(placeText)}&key=$googleApiKey",
    );

    final res = await http.get(uri);
    final data = jsonDecode(res.body);

    if (data["status"] != "OK") {
      throw Exception(
        "Geocoding failed: ${data["status"]} (${data["error_message"] ?? ""})",
      );
    }

    final loc = data["results"][0]["geometry"]["location"];
    return LatLng(
      (loc["lat"] as num).toDouble(),
      (loc["lng"] as num).toDouble(),
    );
  }

  Future<void> _buildRoute(LatLng start, LatLng end) async {
    _markers.clear();
    _polylines.clear();

    _markers.add(
      Marker(
        markerId: const MarkerId("start"),
        position: start,
        infoWindow: const InfoWindow(title: "You"),
      ),
    );

    _markers.add(
      Marker(
        markerId: const MarkerId("end"),
        position: end,
        infoWindow: InfoWindow(title: widget.destinationText),
      ),
    );

    final uri = Uri.parse(
      "https://maps.googleapis.com/maps/api/directions/json?"
      "origin=${start.latitude},${start.longitude}"
      "&destination=${end.latitude},${end.longitude}"
      "&mode=walking"
      "&key=$googleApiKey",
    );

    final res = await http.get(uri);
    final data = jsonDecode(res.body);

    if (data["status"] != "OK") {
      throw Exception(
        "Directions failed: ${data["status"]} (${data["error_message"] ?? ""})",
      );
    }

    final route = data["routes"][0];
    final leg = route["legs"][0];

    final distanceText = leg["distance"]["text"];
    final durationText = leg["duration"]["text"];

    final encoded = route["overview_polyline"]["points"];
    final points = PolylinePoints().decodePolyline(encoded);

    final polylineCoords =
        points.map((p) => LatLng(p.latitude, p.longitude)).toList();

    _polylines.add(
      Polyline(
        polylineId: const PolylineId("route"),
        points: polylineCoords,
        width: 6,
      ),
    );

    setState(() {
      _info = "Distance: $distanceText • Time: $durationText";
    });
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