"""
Blender helper: directly write grouped gripper collections to binary STL.

This avoids Blender's STL exporter selection behavior. It writes triangles from
the mesh objects found in each candidate collection and cannot accidentally
export all visible scene objects.
"""

import os
import struct

import bpy
from mathutils import Vector


OUTPUT_DIR = r"E:\reBot-DevArm-main\reBotArm_simulator\split_meshes\grouped_gripper"

EXPORT_GROUPS = {
    "gripper_base.stl": ("gripper_base", "gripper_base_candidate"),
    "left_finger.stl": ("left_finger", "left_finger_candidate"),
    "right_finger.stl": ("right_finger", "right_finger_candidate"),
    "gripper_hardware.stl": ("gripper_hardware", "hardware_candidate"),
}


def find_collection(names):
    for name in names:
        collection = bpy.data.collections.get(name)
        if collection:
            return collection
    return None


def collection_meshes(collection):
    meshes = [obj for obj in collection.objects if obj.type == "MESH"]
    for child in collection.children:
        meshes.extend(collection_meshes(child))
    return meshes


def mesh_triangles_world(obj):
    depsgraph = bpy.context.evaluated_depsgraph_get()
    eval_obj = obj.evaluated_get(depsgraph)
    mesh = eval_obj.to_mesh()
    mesh.calc_loop_triangles()

    matrix = eval_obj.matrix_world.copy()
    triangles = []
    for tri in mesh.loop_triangles:
        verts = [matrix @ mesh.vertices[index].co for index in tri.vertices]
        normal = (verts[1] - verts[0]).cross(verts[2] - verts[0])
        if normal.length > 0:
            normal.normalize()
        else:
            normal = Vector((0, 0, 0))
        triangles.append((normal, verts))

    eval_obj.to_mesh_clear()
    return triangles


def write_binary_stl(filepath, triangles):
    header = b"reBot grouped gripper STL".ljust(80, b" ")
    with open(filepath, "wb") as stl:
        stl.write(header)
        stl.write(struct.pack("<I", len(triangles)))
        for normal, verts in triangles:
            stl.write(struct.pack("<3f", normal.x, normal.y, normal.z))
            for vert in verts:
                stl.write(struct.pack("<3f", vert.x, vert.y, vert.z))
            stl.write(struct.pack("<H", 0))


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for filename, collection_names in EXPORT_GROUPS.items():
        collection = find_collection(collection_names)
        if not collection:
            print(f"Skip {filename}: collection not found, tried {collection_names}")
            continue

        objects = collection_meshes(collection)
        triangles = []
        for obj in objects:
            triangles.extend(mesh_triangles_world(obj))

        filepath = os.path.join(OUTPUT_DIR, filename)
        write_binary_stl(filepath, triangles)
        size = os.path.getsize(filepath)
        print(f"Wrote {filename}: {len(objects)} objects, {len(triangles)} triangles, {size} bytes")

    print(f"Done. Output folder: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
