"""
Blender helper: auto-group split end_link loose parts into gripper assemblies.

Run this after blender_split_end_link.py.

What it does:
- Reads loose mesh objects from collection "reBot_end_link_split".
- Classifies parts into candidate groups:
  - gripper_base_candidate
  - left_finger_candidate
  - right_finger_candidate
  - hardware_candidate
- Colors the groups for visual inspection.
- Optionally joins each candidate group into one object and exports STL files.

This is intentionally heuristic. Inspect the colored groups before using the
joined STL files for URDF work.
"""

import os

import bpy
from mathutils import Vector


SOURCE_COLLECTION = "reBot_end_link_split"
OUTPUT_DIR = r"E:\reBot-DevArm-main\reBotArm_simulator\split_meshes\grouped_gripper"
JOIN_AND_EXPORT = False

GROUPS = {
    "gripper_base_candidate": (0.55, 0.62, 0.68, 1.0),
    "left_finger_candidate": (0.15, 0.80, 0.65, 1.0),
    "right_finger_candidate": (0.95, 0.62, 0.20, 1.0),
    "hardware_candidate": (0.75, 0.75, 0.75, 1.0),
}


def get_or_create_collection(name):
    collection = bpy.data.collections.get(name)
    if collection:
        return collection
    collection = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(collection)
    return collection


def get_material(name, color):
    material = bpy.data.materials.get(name)
    if material:
        return material
    material = bpy.data.materials.new(name)
    material.diffuse_color = color
    return material


def move_to_collection(obj, collection):
    for old_collection in list(obj.users_collection):
        old_collection.objects.unlink(obj)
    collection.objects.link(obj)


def object_bounds(obj):
    corners = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
    min_corner = Vector((min(c.x for c in corners), min(c.y for c in corners), min(c.z for c in corners)))
    max_corner = Vector((max(c.x for c in corners), max(c.y for c in corners), max(c.z for c in corners)))
    center = (min_corner + max_corner) * 0.5
    size = max_corner - min_corner
    return min_corner, max_corner, center, size


def triangle_count(obj):
    return sum(len(poly.vertices) - 2 for poly in obj.data.polygons)


def source_objects():
    collection = bpy.data.collections.get(SOURCE_COLLECTION)
    if collection:
        return [obj for obj in collection.objects if obj.type == "MESH"]

    selected = [obj for obj in bpy.context.selected_objects if obj.type == "MESH"]
    if selected:
        return selected

    return [obj for obj in bpy.context.scene.objects if obj.type == "MESH" and obj.name.startswith("end_link_part")]


def classify(obj):
    _min_corner, _max_corner, center, size = object_bounds(obj)
    tris = triangle_count(obj)
    volume_hint = max(size.x * size.y * size.z, 0)

    # Tiny repeated shells, pins, screw details, and decorative fragments are
    # safer to keep separate until manual inspection.
    if tris < 500 or volume_hint < 0.00000001:
        return "hardware_candidate"

    # The movable fingers are the long mirrored jaws. In this STL they are
    # elongated mostly along local X and sit on opposite sides of local Y.
    elongated_x = size.x > 0.055 and size.x > size.y * 1.65 and size.x > size.z * 1.45
    side_offset = abs(center.y) > 0.010
    near_tool_tip = center.x < -0.030

    if elongated_x and side_offset and near_tool_tip:
        return "left_finger_candidate" if center.y > 0 else "right_finger_candidate"

    # Mid-size side parts near the jaw pads should follow the nearest finger.
    side_jaw_detail = abs(center.y) > 0.020 and center.x < -0.055
    if side_jaw_detail:
        return "left_finger_candidate" if center.y > 0 else "right_finger_candidate"

    return "gripper_base_candidate"


def assign_groups(objects):
    collections = {name: get_or_create_collection(name) for name in GROUPS}
    materials = {name: get_material(name + "_mat", color) for name, color in GROUPS.items()}
    assignments = {name: [] for name in GROUPS}

    for obj in objects:
        group = classify(obj)
        obj.data.materials.clear()
        obj.data.materials.append(materials[group])
        move_to_collection(obj, collections[group])
        assignments[group].append(obj)

    return assignments


def join_group(group_name, objects):
    if not objects:
        return None

    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    joined = bpy.context.view_layer.objects.active
    joined.name = group_name.replace("_candidate", "")
    joined.data.name = joined.name + "_mesh"
    return joined


def export_stl(obj, output_path):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    if hasattr(bpy.ops.wm, "stl_export"):
        bpy.ops.wm.stl_export(filepath=output_path, export_selected_objects=True)
    else:
        bpy.ops.export_mesh.stl(filepath=output_path, use_selection=True)


def main():
    objects = source_objects()
    if not objects:
        raise RuntimeError("No split end_link objects found. Run blender_split_end_link.py first.")

    assignments = assign_groups(objects)

    print("Auto grouping result:")
    for group_name, objs in assignments.items():
        tris = sum(triangle_count(obj) for obj in objs)
        print(f"  {group_name}: {len(objs)} objects, {tris} triangles")

    if not JOIN_AND_EXPORT:
        print("Review the colored collections first.")
        print("Set JOIN_AND_EXPORT = True in this script after the grouping looks right.")
        return

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for group_name in ("gripper_base_candidate", "left_finger_candidate", "right_finger_candidate"):
        joined = join_group(group_name, assignments[group_name])
        if joined:
            export_path = os.path.join(OUTPUT_DIR, joined.name + ".stl")
            export_stl(joined, export_path)
            print(f"Exported {export_path}")


if __name__ == "__main__":
    main()
