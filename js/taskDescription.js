taskDescription = {       // BuildingTypes, tasks (type, time, minerals, gas, supply)
  command_center: {
    construction:         ["building",  100, 400,   0, 0, 11],
    scv:                  ["worker",     17,  50,   0, 1,  0],
    orbital:              ["addon",      35, 150,   0, 0,  0],
    planetary:            ["addon",      50, 150, 150, 0,  0]
  },
  orbital: {
    mule:                 ["mule",       88,   0,   0, 0,  0],
    extra_supplies:       ["spell",      88,   0,   0, 0,  8],
    scan:                 ["spell",      88,   0,   0, 0,  0],
  },
  planetary: {
    look_mean_like_a_boss:["spell",       0,   0,   0, 0,  0],
  },
  depot: {
    construction:         ["building",   30, 100,   0, 0,  8]
  },
  refinery: {
    construction:         ["building",   30,  75,   0, 0,  0],
    0:                    ["gasWorker_0",   5,   0,   0, 0,  0],
    1:                    ["gasWorker_1",   5,   0,   0, 0,  0],
    2:                    ["gasWorker_2",   5,   0,   0, 0,  0],
    3:                    ["gasWorker_3",   5,   0,   0, 0,  0]
  },
  barracks: {
    construction:         ["building",   60, 150,   0, 0,  0],
    marine:               ["unit",       25,  50,   0, 1,  0],
    maurader:             ["unit",       30, 100,  25, 2,  0],
    reaper:               ["unit",       45,  50,  50, 1,  0],
    reactor:              ["addon",      50,  50,  50, 0,  0],
    tech:                 ["addon",      25,  50,  25, 0,  0]
  },
  factory: {
    construction:         ["building",   60, 150, 100, 0,  0],
    hellion:              ["unit",       30, 100,   0, 2,  0],
    tank:                 ["unit",       45, 150, 125, 3,  0],
    thor:                 ["unit",       60, 300, 200, 6,  0],
    reactor:              ["addon",      50,  50,  50, 0,  0],
    tech:                 ["addon",      25,  50,  25, 0,  0]
  },
  starport: {
    construction:         ["building",   50, 150, 100, 0,  0],
    viking:               ["unit",       42, 150,  75, 2,  0],
    medivac:              ["unit",       42, 100, 100, 2,  0],
    raven:                ["unit",       60, 100, 200, 2,  0],
    banshee:              ["unit",       60, 150, 100, 3,  0],
    battlecruiser:        ["unit",       90, 400, 300, 6,  0],
    reactor:              ["addon",      50,  50,  50, 0,  0],
    tech:                 ["addon",      25,  50,  25, 0,  0]
  },
  tech: {
    combat_sheilds:       ["tech",      110, 100, 100, 0,  0],
    stim:                 ["tech",      140, 100, 100, 0,  0],
    shells:               ["tech",       60,  50,  50, 0,  0],
    nitro_pack:           ["tech",      100,  50,  50, 0,  0],
    infernal_preigniter:  ["tech",      110, 150, 150, 0,  0],
    seige:                ["tech",       80, 100, 100, 0,  0],
    strike_cannon:        ["tech",      110, 150, 150, 0,  0],
    caduceus_reactor:     ["tech",       80, 100, 100, 0,  0],
    corvid_reactor:       ["tech",      110, 150, 150, 0,  0],
    durable_materials:    ["tech",      110, 150, 150, 0,  0],
    seeker_missile:       ["tech",      110, 150, 150, 0,  0],
    cloaking_field:       ["tech",      110, 200, 200, 0,  0]
  },
  reactor: {
    marine:               ["unit",       25,  50,   0, 1,  0],
    hellion:              ["unit",       30, 100,   0, 2,  0],
    viking:               ["unit",       42, 150,  75, 2,  0],
    medivac:              ["unit",       42, 100, 100, 2,  0]
  },
  ghost_academy: {
    construction:         ["building", 40, 150, 50, 0, 0],
    nuke:                 ["tech",     60, 100, 100, 0, 0],
    personal_cloak:       ["tech",    120, 150, 150, 0, 0],
    moebius_reactor:      ["tech",     80, 100, 100, 0, 0]
  },
  fusion_core: {
    construction:         ["building", 65, 150, 150, 0, 0],
    behemoth_reactor:     ["tech",     80, 150, 150, 0, 0],
    weapon_refit:         ["tech",     60, 150, 150, 0, 0]
  },
  engineering: {
    construction:         ["building", 60, 150, 0, 0, 0],
    infantry_weapons1:    ["tech", 160, 100, 100, 0, 0],
    infantry_weapons2:    ["tech", 190, 175, 175, 0, 0],
    infantry_weapons3:    ["tech", 220, 250, 250, 0, 0],
    infantry_armor1:      ["tech", 160, 100, 100, 0, 0],
    infantry_armor2:      ["tech", 190, 175, 175, 0, 0],
    infantry_armor3:      ["tech", 220, 250, 250, 0, 0],
    hi_sec_tracking:      ["tech",  80, 100, 100, 0, 0],
    building_armor:       ["tech", 140, 150, 150, 0, 0],
    neosteel_frame:       ["tech", 110, 100, 100, 0, 0]
  },
  armory: {
    construction:         ["building", 60, 150, 100, 0, 0],
    vehicle_weapons1:     ["tech", 160, 100, 100, 0, 0],
    vehicle_weapons2:     ["tech", 190, 175, 175, 0, 0],
    vehicle_weapons3:     ["tech", 220, 250, 250, 0, 0],
    vehicle_plating1:     ["tech", 160, 100, 100, 0, 0],
    vehicle_plating2:     ["tech", 190, 175, 175, 0, 0],
    vehicle_plating3:     ["tech", 220, 250, 250, 0, 0],
    ship_weapons1:        ["tech", 160, 100, 100, 0, 0],
    ship_weapons2:        ["tech", 190, 175, 175, 0, 0],
    ship_weapons3:        ["tech", 220, 250, 250, 0, 0],
    ship_plating1:        ["tech", 160, 100, 100, 0, 0],
    ship_plating2:        ["tech", 190, 175, 175, 0, 0],
    ship_plating3:        ["tech", 220, 250, 250, 0, 0]
  },
  bunker: {
    construction:         ["building", 35, 100, 0, 0, 0],
    salvage:              ["spell",     5, -100, 0, 0, 0] // TODO - fix to that salvage awards money at end of salvaging
  },
  turret: {
    construction:         ["building", 25, 100, 0, 0, 0]
  },
  sensor_tower: {
    construction:         ["building", 25, 125, 100, 0, 0]
  }
};
