"""
Blender helper: split imported reBot end_link STL into loose mesh parts.

Usage in Blender:
1. Import end_link.STL.
2. Select the imported end_link object.
3. Open Blender's Scripting workspace.
4. Run this file with Text > Run Script.

The script creates:
- a collection named reBot_end_link_split
- one object per loose mesh island
- STL exports in OUTPUT_DIR
- a CSV report with object dimensions and centers

It does not invent real finger joints. After splitting, inspect the largest
parts and choose which shells should become mount / left_finger / right_finger.
"""

import csv
import os
import re

import bpy
from mathutils import Vector


OUTPUT_DIR = r"E:\reBot-DevArm-main\reBotArm_simulator\split_meshes\end_link"
COLLECTION_NAME = "reBot_end_link_split"
NAME_PREFIX = "end_link_part"
MIN_TRIANGLES_TO_EXPORT = 20


def clean_name(name: str) -> str:
    name = re.sub(r"[^A-Za-z0-9_.-]+", "_", name.strip())
    return name[:80] or "part"


def get_selected_mesh_object():
    selected = [obj for obj in bpy.context.selected_objects if obj.type == "MESH"]
    if selected:
        return selected[0]

    for obj in bpy.context.scene.objects:
        if obj.type == "MESH" and "end" in obj.name.lower():
            return obj

    raise RuntimeError("Select the imported end_link mesh before running this script.")


def ensure_collection(name: str):
    existing = bpy.data.collections.get(name)
    if existing:
        return existing

    collection = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(collection)
    return collection


def move_to_collection(obj, collection):
    for old_collection in list(obj.users_collection):
        old_collection.objects.unlink(obj)
    collection.objects.link(obj)


def object_world_bounds(obj):
    corners = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
    min_corner = Vector((min(c.x for c in corners), min(c.y for c in corners), min(c.z for c in corners)))
    max_corner = Vector((max(c.x for c in corners), max(c.y for c in corners), max(c.z for c in corners)))
    center = (min_corner + max_corner) * 0.5
    size = max_corner - min_corner
    return min_corner, max_corner, center, size


def triangle_count(obj):
    return sum(len(poly.vertices) - 2 for poly in obj.data.polygons)


def export_stl(obj, output_path):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

    if hasattr(bpy.ops.wm, "stl_export"):
        bpy.ops.wm.stl_export(filepath=output_path, export_selected_objects=True)
    else:
        bpy.ops.export_mesh.stl(filepath=output_path, use_selection=True)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    source = get_selected_mesh_object()
    source.name = "end_link_source"
    source.data.name = "end_link_source_mesh"

    bpy.ops.object.select_all(action="DESELECT")
    source.select_set(True)
    bpy.context.view_layer.objects.active = source
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.separate(type="LOOSE")
    bpy.ops.object.mode_set(mode="OBJECT")

    collection = ensure_collection(COLLECTION_NAME)
    parts = [obj for obj in bpy.context.selected_objects if obj.type == "MESH"]

    records = []
    for obj in parts:
        tris = triangle_count(obj)
        min_corner, max_corner, center, size = object_world_bounds(obj)
        records.append(
            {
                "object": obj,
                "triangles": tris,
                "center_x": center.x,
                "center_y": center.y,
                "center_z": center.z,
                "size_x": size.x,
                "size_y": size.y,
                "size_z": size.z,
            }
        )

    records.sort(key=lambda item: item["triangles"], reverse=True)

    csv_path = os.path.join(OUTPUT_DIR, "split_report.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as report_file:
        writer = csv.writer(report_file)
        writer.writerow(["name", "triangles", "center_x", "center_y", "center_z", "size_x", "size_y", "size_z", "exported_stl"])

        for index, record in enumerate(records, start=1):
            obj = record["object"]
            obj.name = f"{NAME_PREFIX}_{index:02d}_tris_{record['triangles']}"
            obj.data.name = obj.name + "_mesh"
            move_to_collection(obj, collection)

            export_path = ""
            if record["triangles"] >= MIN_TRIANGLES_TO_EXPORT:
                export_name = clean_name(obj.name) + ".stl"
                export_path = os.path.join(OUTPUT_DIR, export_name)
                export_stl(obj, export_path)

            writer.writerow(
                [
                    obj.name,
                    record["triangles"],
                    f"{record['center_x']:.6f}",
                    f"{record['center_y']:.6f}",
                    f"{record['center_z']:.6f}",
                    f"{record['size_x']:.6f}",
                    f"{record['size_y']:.6f}",
                    f"{record['size_z']:.6f}",
                    export_path,
                ]
            )

    bpy.ops.object.select_all(action="DESELECT")
    for record in records[:12]:
        record["object"].select_set(True)
    if records:
        bpy.context.view_layer.objects.active = records[0]["object"]

    print(f"Split {len(records)} loose parts.")
    print(f"Exported parts to: {OUTPUT_DIR}")
    print(f"Report: {csv_path}")
    print("Tip: inspect the largest parts first. Hide tiny screws/pins, then rename mount / left_finger / right_finger.")


if __name__ == "__main__":
    main()
